FROM node:14.15-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY tsconfig.json ./

RUN mkdir ./src
COPY ./src ./src

RUN mkdir ./views
COPY ./views ./views

RUN mkdir ./ts_src
COPY ./ts_src ./ts_src

CMD ["tsc", "node", "./src/server.js"]