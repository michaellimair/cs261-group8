variable "project_id" {
  type        = string
  description = "Represents the name of the project inside Google Cloud Platform (GCP)."
}

variable "bucket_name" {
  type        = string
  description = "Name of the Google Cloud Storage (GCS) bucket."
}

variable "region" {
  description = "Location for load balancer and Google Cloud Run resources."
  default     = "europe-west3"
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

variable "lb-name" {
  description = "Name for load balancer and associated resources"
  default     = "dbcampus-run-lb"
}
