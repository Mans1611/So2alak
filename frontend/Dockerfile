FROM node:16

RUN mkdir /app

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

CMD ["npm","start"]