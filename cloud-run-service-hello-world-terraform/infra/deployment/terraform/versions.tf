terraform {
  required_providers {
    google = {
      version = "5.4.0"
      source  = "hashicorp/google"
    }
    google-beta = {
      version = "5.4.0"
      source  = "hashicorp/google-beta"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}