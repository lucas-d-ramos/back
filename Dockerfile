FROM backstopjs/backstopjs:6.3.25

ENV NODE_ENV=production

WORKDIR /app

# Copy package files
COPY ["package*.json", "yarn.lock", "./"]

# Install dependencies including Playwright browsers
RUN yarn install && yarn playwright install --with-deps

# Copy all application files
COPY . .

# Make entrypoint script executable
RUN chmod +x /app/run-tests.sh

# Run the test suite
CMD ["/app/run-tests.sh"]
