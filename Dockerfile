FROM node:22-alpine3.18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x bin/p5-manager.js entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
