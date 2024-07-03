# Use official Node.js image as a base
FROM node:14-alpine as build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from current directory to /app in the container
COPY . .

# Build production app
RUN npm run build

# Use lightweight Node.js image for serving React SPA
FROM node:14-alpine

# Set working directory inside the container
WORKDIR /app

# Copy build output from build stage
COPY --from=build /app/build ./build

# Expose port 3000 (or the port your React app listens to)
EXPOSE 3001

# Command to run your React app
CMD ["npx", "serve", "-s", "build"]
