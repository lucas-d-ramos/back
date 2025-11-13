#!/bin/bash

# Exit on error
set -e

echo "Installing Playwright browsers..."
yarn playwright install

echo "Running BackstopJS tests..."
yarn ci-test

echo "Sending Slack report..."
if [ -f "actionkit/reports/json_report/jsonReport.json" ]; then
  if [ -n "$SLACK_WEBHOOK_URL" ]; then
    node slack-report.mjs actionkit/reports/json_report/jsonReport.json
    echo "Slack report sent successfully!"
  else
    echo "Warning: SLACK_WEBHOOK_URL not set, skipping Slack notification"
  fi
else
  echo "Warning: Report file not found, skipping Slack notification"
fi

echo "Build completed successfully!"
