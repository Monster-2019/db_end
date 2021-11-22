FROM node:lts-alpine as builder

RUN mkdir -p /app
WORKDIR /app

COPY ./package.json .
RUN npm install

COPY . .
RUN npm install -g pm2

CMD npm start

EXPOSE 5001