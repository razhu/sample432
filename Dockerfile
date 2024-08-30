# TODO: Need to change this for prod mode
FROM --platform=linux/amd64 node:18.16.1-slim  AS development
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 80

CMD [ "npm", "run", "start:prod" ]
