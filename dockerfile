# Use official Node.js LTS image as base
FROM node:18-alpine 

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
