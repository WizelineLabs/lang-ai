# Installs Node.js image
FROM --platform=linux/amd64 node:20

# Skip env validation to prevent crash on build
# (Docker image should not contain .env in prod)
ARG SKIP_ENV_VALIDATION
ENV SKIP_ENV_VALIDATION=${SKIP_ENV_VALIDATION}

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /usr/src/app

# Copies everything in the local root directory to WORKDIR
COPY / .

# Installs all packages
RUN npm ci

# Build the Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Runs the production npm script to start the server
CMD ["npm", "start"]