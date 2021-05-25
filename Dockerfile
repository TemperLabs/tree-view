FROM node:12.2.0-alpine

WORKDIR /usr/src/app

# ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install
RUN npm install @vue/cli@4.5.3 -g

COPY . ./

EXPOSE 8080

CMD ["npm", "run", "serve"]
