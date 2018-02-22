FROM node:9
WORKDIR /usr/share/app
COPY dist .
COPY node_modules ./node_modules
COPY .env .

CMD ["node", "index.js"]