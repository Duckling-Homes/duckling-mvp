# Use an Alpine image as the base image
FROM alpine:latest

# Install Node.js and npm
RUN apk add --update nodejs npm

# Install ts-node globally
RUN npm install -g ts-node

# Copy the shell script and TypeScript scripts into the image
COPY ./scripts /scripts/
COPY ./prisma /prisma/
COPY ./app /app/
COPY ./package.json /package.json
COPY ./tsconfig.json /tsconfig.json

RUN sed -i '/"canvas": "^2.11.2",/d' /package.json

RUN npm i


# Set the environment variable for ts-node to find the tsconfig.json
ENV TS_NODE_PROJECT=/scripts/tsconfig.json

# Make the script executable
RUN chmod +x /scripts/seed_local_data.sh

# Set the entry point to execute the shell script
CMD ["/bin/sh", "scripts/seed_local_data.sh"]
