FROM node:9
WORKDIR /usr/share/app
COPY dist .
COPY node_modules ./node_modules
COPY .env .

CMD ["node", "index.js"]

HEALTHCHECK CMD curl -f http://localhost:3000/graphql?query=%7Bhello%7Bword%2Crecipient%7D%7D || exit 1