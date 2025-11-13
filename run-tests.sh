#!/bin/bash
set -e

echo "Starting BackstopJS tests..."

# Run tests (allow to continue even if tests fail)
yarn ci-test

# Deploy reports to Netlify
echo "Deploying reports to Netlify..."
yarn netlify deploy --prod -s wemove-frontend-tests -d actionkit/reports

# Send Slack notification
echo "Sending Slack notification..."
node slack-report.mjs actionkit/reports/json_report/jsonReport.json

echo "All tasks completed successfully!"
