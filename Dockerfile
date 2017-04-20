
FROM node:latest
LABEL Name=seng2011 Version=0.0.1 
COPY package.json /tmp/package.json

RUN cd /tmp && yarn

RUN mkdir -p /usr/src/app && mv /tmp/node_modules /usr/src
WORKDIR /usr/src/app
COPY . /usr/src/app
EXPOSE 3001

CMD npm start
