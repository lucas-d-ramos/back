#!/bin/bash
set -e

cd /app

# Run BackstopJS tests (continue even if tests fail)
backstop test --config="actionkit/backstopjs-main.js" || true

# Deploy to Netlify
netlify deploy --prod -s wemove-frontend-tests -d actionkit/reports

# Send Slack notification
node slack-report.mjs actionkit/reports/json_report/jsonReport.json
