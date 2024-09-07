FROM node:18-alpine
WORKDIR /app
RUN apk update && apk add --no-cache g++ python3
COPY package*.json .
RUN npm i
COPY . .
EXPOSE 8000
CMD ["npm", "start"]