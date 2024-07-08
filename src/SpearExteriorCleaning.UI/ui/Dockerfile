FROM alpine:latest as Base

# Install necessary packages
RUN apk add --no-cache nodejs npm nginx

# Create a user and group for running the application
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Create necessary directories and adjust permissions
RUN mkdir -p /app /var/log/nginx /var/lib/nginx /run/nginx && \
    chown -R appuser:appgroup /app /var/log/nginx /var/lib/nginx /run/nginx

# Stage 2: Build Angular application
FROM base as build-stage

# Set the working directory
WORKDIR /app

# Copy the Angular application code
COPY --chown=appuser:appgroup ./my-angular-app /app

RUN npm ci

RUN npm run build --prod

# Stage 3: Nginx config stage
FROM base as nginx-stage

# Copy custom Nginx configuration
COPY --chown=appuser:appgroup ./nginx.conf /etc/nginx/nginx.conf

# Adjust ownership of Nginx directories
RUN chown -R appuser:appgroup /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Switch back to appuser
USER appuser

FROM base as serve-stage

# Set the working directory
WORKDIR /app

# Copy built Angular application from the build stage
COPY --from=build-stage /app /app

# Use Nginx to reverse proxy to Angular SSR application
FROM nginx-stage

USER appuser

# Start both Node.js and Nginx
CMD ["sh", "-c", "npm run serve:ssr & nginx -g 'daemon off;'"]