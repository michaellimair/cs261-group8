terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "4.9.0"
    }
  }
}

provider "google-beta" {
  credentials = file("./serviceAccountKey.json")

  project = var.project_id
  region  = var.region
}

resource "google_storage_bucket" "file_storage" {
  project = var.project_id
  name          = var.bucket_name
  location      = "EU"
  storage_class = "MULTI_REGIONAL"
  force_destroy = true

  uniform_bucket_level_access = true

  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

module "***REMOVED***-vpc-module" {
  source       = "terraform-google-modules/network/google"
  version      = "~> 3.3.0"
  project_id   = var.project_id # Replace this with your project ID in quotes
  network_name = "***REMOVED***-serverless-network"
  mtu          = 1460

  subnets = [
    {
      subnet_name   = "***REMOVED***-serverless-subnet"
      subnet_ip     = "10.10.10.0/28"
      subnet_region = var.region
    }
  ]
}

module "serverless-connector" {
  source     = "terraform-google-modules/network/google//modules/vpc-serverless-connector-beta"
  project_id = var.project_id
  vpc_connectors = [{
    name        = "***REMOVED***-serverless-vpc"
    region      = var.region
    subnet_name = module.test-vpc-module.subnets["${var.region}/serverless-subnet"].name
    machine_type  = "f1-micro"
    min_instances = 1
    max_instances = 3
    }
  ]
  depends_on = [
    google_project_service.vpcaccess-api
  ]
}

resource "google_project_service" "vpcaccess-api" {
  project = var.project_id # Replace this with your project ID in quotes
  service = "vpcaccess.googleapis.com"
}

resource "google_cloud_run_service" "gcr_service" {
  name     = "***REMOVED***-gcr-service"
  provider = google-beta
  location = var.region

  template {
    spec {
      containers {
        image = "us-docker.pkg.dev/cloudrun/container/hello"
      }
    }

    metadata {
      annotations = {
        # Limit scale up to prevent any cost blow outs!
        "autoscaling.knative.dev/maxScale" = "5"
        # Use the VPC Connector
        "run.googleapis.com/vpc-access-connector" = google_vpc_access_connector.connector.name
        # all egress from the service should go through the VPC Connector
        "run.googleapis.com/vpc-access-egress" = "all"
      }
    }
  }
  autogenerate_revision_name = true
}

resource "google_cloud_run_service_iam_member" "public-access" {
  location = google_cloud_run_service.default.location
  project  = google_cloud_run_service.default.project
  service  = google_cloud_run_service.default.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_sql_database_instance" "instance" {
  provider = google-beta

  name             = "instance-***REMOVED***"
  region           = var.region
  database_version = "POSTGRES_14"

  depends_on = [google_service_networking_connection.private_vpc_connection]

  settings {
    tier = "db-f1-micro"
    availability_type = "REGIONAL"
    backup_configuration {
      enabled = true
    }
    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.private_network.id
    }
  }
}
