FROM node:lts-alpine

# Set working directory
RUN install -m 775 -d /usr/src/app
WORKDIR /usr/src/app

# Add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --silent

# Start app
CMD ["npm", "run", "dev"]
