variable "project_id" {
  type        = string
  description = "Represents the name of the project inside Google Cloud Platform (GCP)."
}

variable "bucket_name" {
  type        = string
  description = "Name of the Google Cloud Storage (GCS) bucket."
}

variable "tf_state_bucket_name" {
  type        = string
  description = "Name of the Google Cloud Storage (GCS) bucket used for storing the Terraform state."
}

variable "tf_state_prefix" {
  type = string
  description = "Prefix to be used for storing the Terraform state."
}

variable "cloud_run_main_service" {
  type        = string
  description = "Name of the Google Cloud Run service that is hosted in the main region."
}

variable "cloud_run_failover_service" {
  type        = string
  description = "Name of the Google Cloud Run service that is hosted in the failover region."
}

variable "cloud_run_image" {
  type        = string
  description = "Name of the Google Cloud Run image to be deployed to the Google Cloud Run instance."
}

variable "region" {
  description = "Location for load balancer and Google Cloud Run resources."
  default     = "europe-west1"
}

variable "region_failover" {
  description = "Location for Google Cloud Run failover."
  default     = "europe-west4"
}

variable "ssl" {
  description = "Run load balancer on HTTPS and provision managed certificate with provided `domain`."
  type        = bool
  default     = true
}

variable "domain" {
  description = "Domain name to run the load balancer on. Used if `ssl` is `true`."
  type        = string
}


variable "network_prefix" {
  description = "Name for load balancer and associated resources"
  default     = "cs261-network"
}

variable "db_user" {
  description = "Name of the Cloud SQL database user."
  type = string
}

variable "db_name" {
  description = "Name of the Cloud SQL database."
  default = "cs261_database"
}

variable "lb-name" {
  description = "Name for load balancer and associated resources."
  default     = "cs261-run-lb"
}

variable "bucket_location" {
  description = "Location of the Google Cloud Storage bucket."
  default = "EU"
}

variable "heroku_api_key" {
  description = "API Key to access Heroku resources for provisioning of the SQL database."
  type = string
}

variable "heroku_email" {
  description = "Email of the Heroku project used for the SQL database."
  type = string
}

variable "heroku_app_name" {
  description = "Name of the Heroku project used for the SQL database."
  type = string
}

variable "heroku_region" {
  description = "Region of deployment for the Heroku application."
  default = "eu"
}
