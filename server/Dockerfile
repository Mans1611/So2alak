FROM node:16
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "dev" ]; \
    then npm install; \ 
    else npm install --only=production; \
    fi

COPY . ./ 
EXPOSE 8000


ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD mans1611
ENV POSTGRES_DB so2alak
ENV POSTGRES_HOST postgres-sql
ENV POSTGRES_PORT 5432

VOLUME /var/lib/postgres/data


CMD [ "node" , "index.js" ]