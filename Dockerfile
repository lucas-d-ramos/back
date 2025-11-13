FROM backstopjs/backstopjs:6.3.25

ENV NODE_ENV=production

WORKDIR /app

# Copy package files
COPY ["package*.json", "yarn.lock", "./"]

# Install dependencies only (Playwright browsers already in base image)
RUN yarn install --production --frozen-lockfile && \
    yarn cache clean && \
    rm -rf /tmp/* /root/.cache

# Copy only necessary application files
COPY actionkit ./actionkit
COPY slack-report.mjs ./
COPY approve-report.mjs ./
COPY run-tests.sh ./

# Make entrypoint script executable
RUN chmod +x /app/run-tests.sh

# Run the test suite
CMD ["/app/run-tests.sh"]
