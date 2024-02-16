#!/bin/bash

# Check for the correct number of arguments
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <connection_string> <output_file>"
    exit 1
fi

# Check if pg_dump is installed
if ! command -v pg_dump &> /dev/null; then
    echo "pg_dump could not be found. Please install PostgreSQL or make sure pg_dump is in your PATH."
    exit 1
fi

CONNECTION_STRING="$1"
OUTPUT="$2"

# Parse the connection string
DB_USER=$(echo $CONNECTION_STRING | sed -n 's,.*://\([^:]*\):.*,\1,p')
DB_PASSWORD=$(echo $CONNECTION_STRING | sed -n 's,.*://[^:]*:\([^@]*\)@.*,\1,p')
DB_HOST=$(echo $CONNECTION_STRING | sed -n 's,.*@\([^:/]*\).*,\1,p')
DB_NAME=$(echo $CONNECTION_STRING | sed -n 's,.*/\([^?]*\).*,\1,p')

# Export password to avoid the prompt
export PGPASSWORD=$DB_PASSWORD

# Dump the database
pg_dump -U $DB_USER -h $DB_HOST $DB_NAME > $OUTPUT

# Unset the password for security reasons
unset PGPASSWORD

echo "Database dump completed: $OUTPUT"