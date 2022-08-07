FROM node:16.15.1-alpine

WORKDIR /backend

COPY package.json /backend

RUN npm install

COPY . .

EXPOSE ${PORT}

# CMD ["npm", "run", "start"]