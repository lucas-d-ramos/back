#!/bin/bash
set -e

echo "============================================"
echo "Starting BackstopJS Test Suite"
echo "============================================"

# Run BackstopJS tests (without --docker since we're inside container)
echo "Running BackstopJS tests..."
yarn ci-test-container || echo "Tests completed with failures"

echo ""
echo "============================================"
echo "Deploying reports to Netlify"
echo "============================================"
yarn netlify deploy --prod -s wemove-frontend-tests -d actionkit/reports

echo ""
echo "============================================"
echo "Sending Slack notification"
echo "============================================"
node slack-report.mjs actionkit/reports/json_report/jsonReport.json

echo ""
echo "============================================"
echo "All tasks completed successfully!"
echo "============================================"
