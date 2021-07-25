# Base image of the docker container
FROM node:16-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Copy files to work dir
COPY . .

RUN ls -la ./
RUN pwd

RUN mkdir downloads
RUN chmod -R 755 downloads
RUN chmod -R 755 ./bin/fetch

# Install files to work dir
RUN npm install

# Remove previous build
RUN rm -rf tsconfig.tsbuildinfo

# Build the project
RUN npm run build

# Link
RUN npm link

# To Browse the crawled files
RUN npm install -g http-server

# For Documentation
EXPOSE 8080

# To Surf Crawled websites
EXPOSE 8090

# ENTRYPOINT ["/usr/src/app/bin/fetch"]