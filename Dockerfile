FROM backstopjs/backstopjs:6.3.25

ENV NODE_ENV=production

WORKDIR /app

COPY ["package*.json", "yarn.lock", "./"]

RUN yarn install && yarn playwright install

COPY . .

# Railway will use the start command from package.json
CMD ["yarn", "start"]
