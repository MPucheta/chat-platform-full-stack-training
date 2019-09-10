FROM node:lts-alpine

COPY src /usr/src/app/src
COPY package.json /usr/src/app/package.json
COPY executeMigrationAndRun.sh /usr/src/app/executeMigrationAndRun.sh
COPY .sequelizerc /usr/src/app/.sequelizerc

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

EXPOSE 3000

RUN npm install --silent

CMD ["sh", "executeMigrationAndRun.sh"]
