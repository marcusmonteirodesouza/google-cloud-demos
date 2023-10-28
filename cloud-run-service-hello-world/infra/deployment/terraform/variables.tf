variable "environment" {
  type        = string
  description = "The deployment environment."
}

variable "project_id" {
  type        = string
  description = "The project ID."
}

variable "ssl_certificate" {
  type        = string
  description = "The SSL certificate in PEM format."
}

variable "ssl_certificate_private_key" {
  type        = string
  description = "The SSL certificate write-only private key in PEM format."
  sensitive   = true
}