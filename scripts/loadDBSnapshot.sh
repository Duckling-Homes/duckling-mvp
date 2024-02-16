#!/bin/bash
set -e


# Check for minimum required arguments
if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <input_file> [connection_string]"
    exit 1
fi

INPUT="$1"
CONNECTION_STRING="${2}"

# If connection string is not provided, prompt user before using default local connection
if [ -z "$CONNECTION_STRING" ]; then
    echo "Connection string not provided. Defaulting to local database settings."
    read -p "Proceed with local settings? (y/n): " proceed
    if [[ $proceed != "y" ]]; then
        echo "Operation cancelled."
        exit 1
    fi
    CONNECTION_STRING="postgresql://admin:admin@localhost:5447/postgres"
fi

# Prompt for overwrite confirmation
read -p "This will overwrite the existing database. Are you sure? (y/n): " overwrite
if [[ $overwrite != "y" ]]; then
    echo "Operation cancelled."
    exit 1
fi

# # Replaces all mentions of rahul with admin
# sed -i '' 's/rahul/${DB_NAME}/g' output_file.sql


# Parse the connection string
DB_USER=$(echo $CONNECTION_STRING | sed -n 's,.*://\([^:]*\):.*,\1,p')
DB_PASSWORD=$(echo $CONNECTION_STRING | sed -n 's,.*://[^:]*:\([^@]*\)@.*,\1,p')
DB_HOST=$(echo $CONNECTION_STRING | sed -n 's,.*@\([^:/]*\).*,\1,p')
DB_PORT=$(echo $CONNECTION_STRING | sed -n 's,.*:\([0-9]*\)/.*,\1,p')
DB_NAME=$(echo $CONNECTION_STRING | awk -F '/' '{print $NF}' | awk -F '?' '{print $1}')

echo "===================================================="
echo "Input file: $INPUT"
echo "Connection string: $CONNECTION_STRING"
echo "Database name: $DB_NAME"
echo "Database user: $DB_USER"
echo "Database password: $DB_PASSWORD"
echo "Database host: $DB_HOST"
echo "Database port: $DB_PORT"
echo "===================================================="


# Check if psql is installed
if ! command -v psql &> /dev/null; then
    echo "psql could not be found. Please install PostgreSQL or make sure psql is in your PATH."
    exit 1
fi

# Export password to avoid the prompt
export PGPASSWORD=$DB_PASSWORD

# Drop all tables in the database
psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -c "
DO
\$do\$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END
\$do\$;
"

# Load the database snapshot
psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -f $INPUT

# Unset the password for security reasons
unset PGPASSWORD

echo "Database load completed: $INPUT"