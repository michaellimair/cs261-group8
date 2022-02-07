terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "4.9.0"
    }
  }
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
      containers {
        image = "gcr.io/${var.project_id}/${var.cloud_run_main_service}"
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale" = "5"
      }
    }
  }
  autogenerate_revision_name = true
}

resource "google_cloud_run_service_iam_member" "public-access" {
  location = google_cloud_run_service.gcr_service_main.location
  project  = google_cloud_run_service.gcr_service_main.project
  service  = google_cloud_run_service.gcr_service_main.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
