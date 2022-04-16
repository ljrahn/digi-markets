FROM node

# create & set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install pm2 for production ready process manager
RUN npm install --global pm2

# Copy package.json and install dependencies
COPY ./package.json .
RUN npm install

# Copy all other files
COPY . .

# Build the static files
RUN npm run build

# Expose port 3000
EXPOSE 3000

# The node user is provided in the node image
USER node

# start app
CMD [ "pm2-runtime", "npm", "--", "start" ]