# Use the official Node.js 20 Alpine image as the base
FROM node:20-alpine

# Install Chromium and its dependencies required by Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn \
    dumb-init \
    bash

# Set environment variables for Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    NODE_ENV=production

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install --production

# Copy the rest of your application code to the container
COPY . .

# Create a non-root user to run the application
RUN addgroup -S pptruser && adduser -S pptruser -G pptruser

# Change to the non-root user
USER pptruser

# Expose the port your application runs on (adjust as needed)
EXPOSE 3000

# Use dumb-init to handle PID 1 and signal forwarding
ENTRYPOINT ["dumb-init", "--"]

# Define the command to run your application
CMD ["node", "index.js"]
