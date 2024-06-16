FROM node:latest AS build-stage

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Build the Angular application
RUN npm run build

# Stage 2: Serve the application
FROM node:latest AS serve-stage

WORKDIR /app

# Copy the built application from the build stage
COPY --from=build-stage /app/dist ./dist

# Install only production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 443

# Start the application
CMD ["node", "dist/ui/server/server.mjs"]
