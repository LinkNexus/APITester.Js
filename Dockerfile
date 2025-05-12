FROM node:23-alpine
WORKDIR /app
COPY package*.json .
RUN npm install --legacy-peer-deps
EXPOSE 3333
COPY . .
RUN mv .env.example .env
RUN rm database.db
RUN npm run migrations
RUN npm run build
CMD ["npm", "run", "server"]

