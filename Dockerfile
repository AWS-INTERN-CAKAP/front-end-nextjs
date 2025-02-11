# Use Node.js as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to optimize build caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire source code into the container
COPY . .

# Set environment variable for Vite to be accessible via IP or hostname
ENV HOST=0.0.0.0

# Build and run the app
RUN npm run build
CMD ["npm", "run", "dev"]

# Expose port used by Vite
EXPOSE 5173
