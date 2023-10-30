locals {
  compute_sa_email = "service-${data.google_project.project.number}@compute-system.iam.gserviceaccount.com"
}

resource "google_kms_crypto_key_iam_member" "compute_sa_default_confidential" {
  crypto_key_id = var.default_confidential_crypto_key_id
  role          = "roles/cloudkms.cryptoKeyEncrypterDecrypter"
  member        = "serviceAccount:${local.compute_sa_email}"
}