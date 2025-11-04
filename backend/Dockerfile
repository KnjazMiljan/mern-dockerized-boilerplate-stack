# --- Stage 1: Build ---
# Use a Node.js image to build the app
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install all dependencies (including devDependencies needed for build)
RUN npm install

# Copy the rest of the source code
COPY . .

# (Optional) If you are using TypeScript or a build step:
# RUN npm run build

# --- Stage 2: Production ---
# Use a lightweight Node.js image for the final image
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json again
COPY package*.json ./

# Install *only* production dependencies
RUN npm install --omit=dev

# Copy the built app from the 'builder' stage
# If you had a build step, you might copy from /app/dist
COPY --from=builder /app .

# Expose the port your app runs on
EXPOSE 5000

# Command to run the application
CMD ["node", "server.js"]