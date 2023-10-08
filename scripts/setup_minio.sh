#!/bin/bash

sleep 10 # Wait for the MinIO server to start

mc alias set myminio http://minio:9000 minio minio123

# Check if the bucket already exists
if mc ls myminio | grep -q 'image-uploads'; then
  echo "Bucket image-uploads already exists. Skipping creation."
else
  mc mb myminio/image-uploads
  echo "Bucket image-uploads created."
fi
