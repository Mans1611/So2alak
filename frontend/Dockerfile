FROM node:16 as build 

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install 

CMD ["npm","start"]