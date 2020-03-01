from node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm run start
EXPOSE 3000
