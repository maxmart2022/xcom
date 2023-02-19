FROM node:alpine

WORKDIR /app
<<<<<<< HEAD
COPY package.json .
RUN npm install --only=prod
COPY . .

CMD ["npm", "run", "dev"]
=======

COPY package.json .

RUN npm install --only=prod

COPY . .

CMD ["npm", "run", "start"]
>>>>>>> origin/shabeeb
