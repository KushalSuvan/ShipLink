# Step 1: Use an official Node.js runtime as a base image for building
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Step 2: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies including TypeScript compiler
RUN npm install

# Step 3: Copy all source files to the container
COPY . .

# Step 4: Transpile TypeScript to JavaScript
RUN npm run build

# Step 5: Create a new stage for the production environment
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /app

# Step 6: Copy only the necessary files from the build stage
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY package*.json ./

# Expose the port your Express app will run on
EXPOSE 8000

# Step 7: Set the command to start the app (from the dist folder)
CMD ["npm", "start"]
