terraform {
  required_providers {
    google = {
      version = "5.4.0"
      source  = "hashicorp/google"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}