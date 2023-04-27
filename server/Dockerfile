FROM node:18-slim

RUN mkdir -p /home/node/server

WORKDIR /home/node/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]