FROM node:25-alpine3.21

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
