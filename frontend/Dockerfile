FROM node:16.18.0-alpine

WORKDIR /usr/frontend/

COPY ./package.json .

RUN npm install --legacy-peer-deps 

COPY . .


