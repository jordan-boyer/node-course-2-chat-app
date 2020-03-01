from node:lts-alpine
WORKDIR /app
RUN pwd
RUN ls
COPY package*.json ./
RUN npm install
COPY server ./server
COPY public ./public
RUN ls
RUN npm run start
EXPOSE 3000
