# Use an Alpine image as the base image
FROM alpine:latest

# Install MinIO Client (mc)
RUN wget https://dl.min.io/client/mc/release/linux-amd64/mc \
    && chmod +x mc \
    && mv mc /usr/local/bin

# Copy the shell script into the image
COPY scripts/setup_minio.sh /setup_minio.sh

# Make the script executable
RUN chmod +x /setup_minio.sh

# Set the entry point to execute the shell script
CMD ["/bin/sh", "/setup_minio.sh"]
