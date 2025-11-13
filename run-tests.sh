#!/bin/bash

echo "============================================"
echo "Container started at: $(date)"
echo "Working directory: $(pwd)"
echo "Files in /app:"
ls -la /app
echo "Environment check:"
echo "NODE_ENV: $NODE_ENV"
echo "NETLIFY_AUTH_TOKEN: ${NETLIFY_AUTH_TOKEN:0:10}... (truncated)"
echo "SLACK_WEBHOOK_URL: ${SLACK_WEBHOOK_URL:0:30}... (truncated)"
echo "============================================"
echo "Starting BackstopJS Test Suite"
echo "============================================"

# Run BackstopJS tests (without --docker flag since we're already in Docker)
echo "Running BackstopJS tests..."
backstop test --config="actionkit/backstopjs-main.js" || echo "Tests completed with failures"

echo ""
echo "============================================"
echo "Deploying reports to Netlify"
echo "============================================"
netlify deploy --prod -s wemove-frontend-tests -d actionkit/reports

echo ""
echo "============================================"
echo "Sending Slack notification"
echo "============================================"
node slack-report.mjs actionkit/reports/json_report/jsonReport.json

echo ""
echo "============================================"
echo "All tasks completed successfully!"
echo "============================================"
