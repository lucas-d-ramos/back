FROM backstopjs/backstopjs:6.3.25

ENV NODE_ENV=production

WORKDIR /app

COPY ["package*.json", "yarn.lock", "./"]

RUN yarn install

COPY actionkit ./
