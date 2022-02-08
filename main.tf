terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "4.9.0"
    }
  }

  # Store all Terraform state in a Google Cloud Storage bucket
  # Since variables cannot be used, text file needs to be generated dynamically
  backend "gcs" {}
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

data "google_project" "project" {
}

resource "google_secret_manager_secret" "db-user" {
  secret_id = "${var.project_id}-dbuser"

  replication {
    user_managed {
      replicas {
        location = var.region
      }
      replicas {
        location = var.region_failover
      }
    }
  }
}

resource "google_secret_manager_secret_version" "db-user" {
  secret = google_secret_manager_secret.db-user.id
  secret_data = var.db_user
}

resource "google_secret_manager_secret_iam_member" "dbuser-access" {
  secret_id = google_secret_manager_secret.db-user.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
  depends_on = [google_secret_manager_secret.db-user]
}

resource "google_secret_manager_secret" "db-password" {
  secret_id = "${var.project_id}-dbpassword"

  replication {
    user_managed {
      replicas {
        location = var.region
      }
      replicas {
        location = var.region_failover
      }
    }
  }
}

resource "google_secret_manager_secret_version" "db-password" {
  secret = google_secret_manager_secret.db-password.id
  secret_data = var.db_password
}

resource "google_secret_manager_secret_iam_member" "dbpassword-access" {
  secret_id = google_secret_manager_secret.db-password.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
  depends_on = [google_secret_manager_secret.db-password]
}

resource "google_secret_manager_secret" "db-name" {
  secret_id = "${var.project_id}-dbname"

  replication {
    user_managed {
      replicas {
        location = var.region
      }
      replicas {
        location = var.region_failover
      }
    }
  }
}

resource "google_secret_manager_secret_version" "db-name" {
  secret = google_secret_manager_secret.db-name.id
  secret_data = var.db_name
}

resource "google_secret_manager_secret_iam_member" "dbname-access" {
  secret_id = google_secret_manager_secret.db-name.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
  depends_on = [google_secret_manager_secret.db-name]
}

resource "google_cloud_run_service" "gcr_service_main" {
  name     = var.cloud_run_main_service
  provider = google-beta
  location = var.region

  template {
    spec {
      # Container will pull image pushed to Google Container Registry in previous GitHub Action step
      containers {
        image = "${var.cloud_run_image}"
        env {
          name = "DB_NAME"
          value = var.db_name
        }

        env {
          name = "DB_SOCKET_DIR"
          value = "/cloudsql"
        }

        env {
          name = "DB_USER"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.db-user.secret_id
              key = "latest"
            }
          }
        }

        env {
          name = "DB_PASSWORD"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.db-password.secret_id
              key = "latest"
            }
          }
        }

        env {
          name = "STATICFILES_STORAGE"
          value = "storages.backends.gcloud.GoogleCloudStorage"
        }

        env {
          name = "GCS_BUCKET"
          value = var.bucket_name
        }
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"      = "5"
        "run.googleapis.com/cloudsql-instances" = google_sql_database_instance.instance.connection_name
        "run.googleapis.com/client-name"        = "terraform"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  autogenerate_revision_name = true
}

# Ensure that the backend engine is a public endpoint
resource "google_cloud_run_service_iam_member" "public-access" {
  location = google_cloud_run_service.gcr_service_main.location
  project  = google_cloud_run_service.gcr_service_main.project
  service  = google_cloud_run_service.gcr_service_main.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "random_id" "db_name_suffix" {
  byte_length = 4
}

# Spin up a Google Cloud SQL instance
resource "google_sql_database_instance" "instance" {
  provider = google-beta

  name             = "${var.project_id}-dbinstance-${random_id.db_name_suffix.hex}"
  region           = var.region
  database_version = "POSTGRES_14"

  settings {
    tier = "db-f1-micro"
    availability_type = "REGIONAL"
    backup_configuration {
      enabled = true
    }
  }

  deletion_protection = "false"
}

resource "google_sql_database" "database" {
  name     = var.db_name
  instance = google_sql_database_instance.instance.name
}

resource "google_sql_user" "users" {
  name     = var.db_user
  instance = google_sql_database_instance.instance.name
  password = var.db_password
}

output "sql_cert" {
  value       = google_sql_database_instance.instance.server_ca_cert
  description = "CA Certificate of the Cloud SQL Instance."
  sensitive   = true
}

output "sql_ip" {
  value       = google_sql_database_instance.instance.first_ip_address
  description = "IP Address of the Cloud SQL Instance."
  sensitive   = true
}
