# Basic image
FROM node:16

# Application directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json file
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copy all other project files
COPY. .

# Specify the port used by the application
EXPOSE 3000

# Command to launch the application
CMD ["npm", "start"]