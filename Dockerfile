from node:lts-alpine
WORKDIR /app
RUN pwd
RUN ls
COPY package*.json ./
RUN npm install
COPY server ./
COPY public ./
RUN npm run start
EXPOSE 3000
