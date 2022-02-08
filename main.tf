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

resource "google_cloud_run_service" "gcr_service_main" {
  name     = var.cloud_run_main_service
  provider = google-beta
  location = var.region

  template {
    spec {
      # Container will pull image pushed to Google Container Registry in previous GitHub Action step
      containers {
        image = "${var.cloud_run_image}"
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

# Spin up a Google Cloud SQL instance
resource "google_sql_database_instance" "instance" {
  provider = google-beta

  name             = "${var.project_id}-dbinstance"
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
