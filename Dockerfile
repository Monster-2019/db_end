FROM nginx:stable-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

FROM node:lts-alpine as builder

RUN mkdir -p /app
WORKDIR /app

COPY . .
RUN npm install && npm install -g pm2

CMD npm start

EXPOSE 5001