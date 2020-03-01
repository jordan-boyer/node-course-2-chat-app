from node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY server ./
COPY public ./
RUN npm run start
EXPOSE 3000
