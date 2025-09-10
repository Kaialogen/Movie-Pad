# Use official Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build Vite project
RUN npm run build

# Expose port
EXPOSE 8080

# Start the Node server
CMD ["node", "server.js"]