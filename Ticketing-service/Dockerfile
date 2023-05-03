FROM node:16
WORKDIR usr/scr/app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 5000
CMD ["node", "index.js"]