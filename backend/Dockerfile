FROM node

WORKDIR /backend

COPY package.json /backend

RUN npm install

COPY . .

ENV PORT=4000

EXPOSE $PORT

CMD ["npm", "run", "start"]