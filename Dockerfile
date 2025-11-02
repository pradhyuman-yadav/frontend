# Dockerfile for React Frontend
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies as root first
RUN npm ci

# Copy source code
COPY . .

# Fix permissions for node_modules and all files
RUN chown -R node:node /app && \
    chmod -R 755 /app/node_modules

# Switch to node user
USER node

# Expose port 3001
EXPOSE 3001

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3001"]
