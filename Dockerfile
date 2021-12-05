FROM node:lts
WORKDIR /usr/local/app
RUN pwd
COPY package.json ./
COPY package-lock.json ./
RUN npm install
WORKDIR /usr/local/app/server
RUN pwd
COPY package.json ./
COPY package-lock.json ./
RUN npm install
# WORKDIR sets dir for docker-compose commands to run
WORKDIR /usr/local/app