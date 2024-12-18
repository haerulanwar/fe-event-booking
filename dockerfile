# Use a suitable Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm i -g serve

# Copy the rest of the application code
COPY . .

# Build the application (if necessary)
RUN npm run build

# Expose the port the application runs on (e.g., 3000)
EXPOSE 3000

# Define the command to run the application
CMD ["serve", "-s", "dist"]
