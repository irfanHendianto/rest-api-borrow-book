
FROM node:16.20.1-slim

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN apt-get update -y && apt-get install -y openssl
RUN npm install prisma
RUN npm install ts-node
RUN npm run build

CMD ["node", "dist/index.js"]

