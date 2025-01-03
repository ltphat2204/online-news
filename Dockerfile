FROM node:20-alpine

WORKDIR /usr/ltphat/src/webproj

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
