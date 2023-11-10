variable "company_name" {
  default = "gcloudrecipes"
}

variable "environment" {
  default     = "dev"
  description = "Deployment environment."
}

variable "project_id" {
  type        = string
  description = "The project ID."
}

variable "vendors_management_app_users_group" {
  type        = string
  description = "Vendors Management App Users Google group."
}

variable "vendors_management_app_support_email" {
  type        = string
  description = "Vendors Management App support email."
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