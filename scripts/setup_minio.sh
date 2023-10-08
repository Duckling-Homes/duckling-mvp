#!/bin/bash

# Log a message and exit with an error code
log_and_exit() {
  echo "Error: $1"
  exit 1
}

echo "Starting MinIO setup..."

# Wait for the MinIO server to start
echo "Waiting for MinIO server to start..."
sleep 3

# Add MinIO alias
echo "Setting MinIO alias..."
mc alias set myminio http://minio:9000 minio minio123 || log_and_exit "Failed to set MinIO alias"

# Check if the bucket already exists
echo "Checking if bucket 'image-uploads' exists..."
if mc ls myminio | grep -q 'image-uploads'; then
  echo "Bucket 'image-uploads' already exists. Skipping creation."
else
  echo "Creating bucket 'image-uploads'..."
  mc mb myminio/image-uploads || log_and_exit "Failed to create bucket"
  echo "Bucket 'image-uploads' created."
fi

# Set up anonymous read and write policy on the bucket
echo "Setting anonymous public policy on 'image-uploads'..."
mc anonymous set public myminio/image-uploads || log_and_exit "Failed to set public policy"

echo "MinIO setup completed successfully!"
