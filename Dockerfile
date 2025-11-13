FROM mcr.microsoft.com/playwright:v1.54.1-jammy

ENV NODE_ENV=production

WORKDIR /app

# Install pngquant for image compression
RUN apt-get update && apt-get install -y pngquant && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY ["package*.json", "yarn.lock", "./"]

# Install dependencies (browsers already in base image)
RUN yarn install --production --frozen-lockfile && \
    yarn cache clean && \
    rm -rf /tmp/* /root/.npm /root/.cache

# Copy only necessary application files
COPY actionkit ./actionkit
COPY slack-report.mjs ./
COPY approve-report.mjs ./
COPY run-tests.sh ./

# Compress reference images to reduce size (lossy compression, quality 80-95)
RUN find actionkit/reports/bitmaps_reference -name "*.png" -exec pngquant --quality=80-95 --ext .png --force {} \; || true

# Make entrypoint script executable
RUN chmod +x /app/run-tests.sh

# Run the test suite
CMD ["/app/run-tests.sh"]
