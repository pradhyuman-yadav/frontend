# Dockerfile for React Frontend
FROM node:20-alpine

# Set working directory
WORKDIR /app

COPY package*.json ./
RUN npm install

# Add this line to fix execute permissions
RUN chmod +x -R ./node_modules/.bin

# Copy source code
COPY . .

# Expose port 3001
EXPOSE 3001

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3001"]
