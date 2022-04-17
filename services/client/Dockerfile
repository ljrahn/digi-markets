FROM node:14

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

# npm run build OR npm run build:staging IF staging build arg specified
ARG staging
RUN if [ -n "$staging" ] ; then npm run build:staging ; else npm run build ; fi

# Expose port 3000
EXPOSE 3000

# The node user is provided in the node image
USER node