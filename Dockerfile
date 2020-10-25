FROM node:lts-buster-slim

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package.json ./

USER node

RUN npm install && npm cache clean --force --loglevel=error

COPY --chown=node:node ./config ./config

COPY --chown=node:node ./src ./src

COPY --chown=node:node ./logs ./logs

COPY --chown=node:node private.key ./
COPY --chown=node:node public.key ./

CMD [ "node", "src/index.js"]

# https://medium.com/better-programming/docker-for-node-js-in-production-b9dc0e9e48e0
