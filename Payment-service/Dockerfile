FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 5001
CMD ["node", "server.js"]