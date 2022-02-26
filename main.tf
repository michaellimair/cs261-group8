terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "4.9.0"
    }
    heroku = {
      source  = "heroku/heroku"
      version = "5.0.0-beta.1"
    }
  }

  # Store all Terraform state in a Google Cloud Storage bucket
  # Since variables cannot be used, text file needs to be generated dynamically
  backend "gcs" {}
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

provider "heroku" {
  email = var.heroku_email
  api_key = var.heroku_api_key
}

# If you receive an error such as `project: required field is not set` from this line, perform the following:
# 1. `gcloud auth login`
# 2. `gcloud config set project PROJECT_ID`
# 3. `gcloud auth application-default login`
# 4. Set environment variable GOOGLE_PROJECT to your PROJECT_ID
data "google_project" "project" {
}

resource "random_password" "db_password" {
  count            = 1
  length           = 128
  special          = true
  override_special = "-_"
}

resource "heroku_app" "main" {
  name = var.heroku_app_name
  region = var.heroku_region
}

resource "heroku_addon" "database" {
  app_id = heroku_app.main.id
  plan   = "heroku-postgresql:hobby-dev"
}

locals {
  // postgres://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME/
  database_url_regex = regex("postgres://(.*):(.*)@(.*):(.*)/(.*)", heroku_addon.database.config_var_values.DATABASE_URL)
  db_user = local.database_url_regex[0]
  db_password = local.database_url_regex[1]
  db_host = local.database_url_regex[2]
  db_port = local.database_url_regex[3]
  db_name = local.database_url_regex[4]
}

### START: Google Secret Manager

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
  secret_data = local.db_user
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
  secret_data = local.db_password
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
  secret_data = local.db_name
}

resource "google_secret_manager_secret_iam_member" "dbname-access" {
  secret_id = google_secret_manager_secret.db-name.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
  depends_on = [google_secret_manager_secret.db-name]
}

resource "google_secret_manager_secret" "db-herokuhost" {
  secret_id = "${var.project_id}-dbherokuhost"

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

resource "google_secret_manager_secret_version" "db-herokuhost" {
  secret = google_secret_manager_secret.db-herokuhost.id
  secret_data = local.db_host
}

resource "google_secret_manager_secret_iam_member" "dbherokuhost-access" {
  secret_id = google_secret_manager_secret.db-herokuhost.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
  depends_on = [google_secret_manager_secret.db-herokuhost]
}

resource "random_password" "django_secret_main" {
  length           = 128
  special          = false
}

resource "google_secret_manager_secret" "django_secret" {
  secret_id = "${var.project_id}-django-secret"

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

resource "google_secret_manager_secret_version" "django_secret" {
  secret = google_secret_manager_secret.django_secret.id
  secret_data = random_password.django_secret_main.result
}

resource "google_secret_manager_secret_iam_member" "django_secret_access" {
  secret_id = google_secret_manager_secret.django_secret.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
  depends_on = [google_secret_manager_secret.django_secret]
}

### END: Google Secret Manager

resource "google_cloud_run_service" "gcr_service_main" {
  name     = var.cloud_run_main_service
  provider = google-beta
  location = var.region

  template {
    spec {
      containers {
        image = "${var.cloud_run_image}"
        env {
          name = "DB_NAME"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.db-name.secret_id
              key = "latest"
            }
          }
        }

        env {
          name = "DB_HOST"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.db-herokuhost.secret_id
              key = "latest"
            }
          }
        }

        env {
          name = "DB_PORT"
          value = local.db_port
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
          name = "DJANGO_SECRET"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.django_secret.secret_id
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

        ports {
          name = "h2c"
          container_port = 8080
        }
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"      = "5"
        "run.googleapis.com/client-name"        = "terraform"
      }
      namespace = var.project_id
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  autogenerate_revision_name = true

  depends_on = [
    google_secret_manager_secret.django_secret,
    google_secret_manager_secret.db-password,
    google_secret_manager_secret.db-user,
  ]
}

resource "google_cloud_run_domain_mapping" "gcr_service_main" {
  location = var.region
  name     = var.domain

  metadata {
    namespace = var.project_id
  }

  spec {
    route_name = google_cloud_run_service.gcr_service_main.name
  }

  depends_on = [
    google_cloud_run_service.gcr_service_main
  ]
}

resource "google_storage_bucket" "filestore_bucket" {
  name          = var.bucket_name
  location      = var.bucket_location
  force_destroy = true

  uniform_bucket_level_access = true

  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

# Ensure that the backend engine is a public endpoint
resource "google_cloud_run_service_iam_member" "public-access-main" {
  location = google_cloud_run_service.gcr_service_main.location
  project  = google_cloud_run_service.gcr_service_main.project
  service  = google_cloud_run_service.gcr_service_main.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "random_id" "db_name_suffix" {
  byte_length = 4
}
