# Use an official Node.js runtime as a parent image
FROM node:20.18.3-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install app dependencies
RUN npm install

# Set environment variables
ENV NODE_ENV=production

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "run", "preview"]
