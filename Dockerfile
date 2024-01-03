
# Use an official Node runtime as a parent image for building
FROM node:16.14.2 as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install app dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the Angular app
RUN npm run build

# Use Nginx as the base image for the production image
FROM nginx:stable

# Copy the Angular app build from the builder stage to the nginx public directory
COPY --from=build /usr/src/app/dist/event-organizer/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# The default command is to start Nginx when the container runs
# CMD ["nginx", "-g", "daemon off;"]


# RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points