FROM backstopjs/backstopjs:6.3.25

ENV NODE_ENV=production

WORKDIR /app

COPY ["package*.json", "yarn.lock", "./"]

RUN yarn install && yarn playwright install

COPY . .

# Make run script executable
RUN chmod +x run.sh

# Railway will execute the run script
CMD ["sh", "./run.sh"]
