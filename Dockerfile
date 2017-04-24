
FROM node:latest
LABEL Name=seng2011 Version=0.0.1 
COPY package.json /tmp/package.json

RUN cd /tmp && yarn
RUN npm install pm2 -g
RUN mkdir -p /usr/src/app && mv /tmp/node_modules /usr/src
WORKDIR /usr/src/app
COPY . /usr/src/app
EXPOSE 3000

CMD pm2 start index.js
