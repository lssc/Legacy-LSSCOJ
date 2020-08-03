FROM node:14-alpine

COPY ./web /workspace
WORKDIR /workspace
RUN npm install

EXPOSE 80

CMD npm start
