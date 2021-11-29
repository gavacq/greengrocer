FROM node:lts
WORKDIR /usr/local/
COPY package.json ./
COPY package-lock.json ./
RUN npm install
ENV PATH /usr/local/node_modules/.bin:$PATH
# WORKDIR sets dir for docker-compose commands to run
WORKDIR /usr/local/app