FROM node:alpine

RUN mkdir /src

WORKDIR /src
ADD package.json /src/
RUN npm install

ADD . /src/


