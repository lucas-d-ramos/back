#!/bin/bash

# Don't exit on error - we want to continue even if tests fail
set +e

echo "Running BackstopJS tests with Puppeteer..."
yarn ci-test

# Ensure output directory exists (create placeholder if tests failed)
if [ ! -d "actionkit/reports/html_report" ]; then
  echo "Creating placeholder HTML report directory..."
  mkdir -p actionkit/reports/html_report
  cat > actionkit/reports/html_report/index.html <<EOF
<!DOCTYPE html>
<html>
<head>
  <title>Test Report</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
    .error { background: #fee; border-left: 4px solid #c00; padding: 20px; }
  </style>
</head>
<body>
  <h1>BackstopJS Test Report</h1>
  <div class="error">
    <h2>Tests Failed to Generate Report</h2>
    <p>The tests encountered an error and could not generate a full report. Please check the build logs for details.</p>
  </div>
</body>
</html>
EOF
fi

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

echo "Build completed!"
exit 0
