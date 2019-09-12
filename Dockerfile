FROM node:lts-alpine

COPY package.json /usr/src/app/package.json

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install --silent

CMD ["npm","run","dev"]
