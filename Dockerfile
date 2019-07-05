FROM keymetrics/pm2:latest-alpine

RUN apk update && apk add bash && rm -rf /var/cache/apk/*

WORKDIR /src

COPY . /src

RUN cd /src

RUN yarn install

RUN pm2 logrotate -u user

EXPOSE 80

RUN yarn build

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
