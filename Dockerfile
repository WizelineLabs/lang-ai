# Installs Node.js image
FROM --platform=linux/amd64 node:20

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /usr/src/app

# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

# Copies everything in the src directory to WORKDIR/src
COPY / .

# Installs all packages
RUN npm ci

# Build the Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Runs the production npm script to start the server
CMD ["npm", "run", "start"]