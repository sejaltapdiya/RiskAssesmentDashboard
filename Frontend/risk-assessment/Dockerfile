FROM node:14-alpine as build
WORKDIR /Frontend
COPY package*.json ./
RUN npm install
RUN npm install axios
RUN npm install react-router-dom --save
