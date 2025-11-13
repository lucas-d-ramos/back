module.exports = [
  {
    label: "twitter--single_tweet---UNKNOWN_USER",
    url: "https://action.wemove.eu/call/developers-testing-campaign-single-tweet-EN/",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
      "div:has(> textarea)",
    ],
  },
  {
    label: "twitter--empty_message",
    url: "https://action.wemove.eu/call/developers-testing-campaign-tweet-DE/",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
      "div:has(> textarea)",
    ],
  },
  {
    label: "twitter--UNKNOWN_USER",
    url: "https://action.wemove.eu/call/developers-testing-campaign-tweet-EN/",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
      "div:has(> textarea)",
    ],
  },
  {
    label: "twitter---KNOWN_USER_NEVER",
    url: "https://action.wemove.eu/call/developers-testing-campaign-tweet-FR/?akid=.1172942.fL7c2K",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
      "div:has(> textarea)",
    ],
  },
  {
    label: "twitter---KNOWN_USER_SUBSCRIBED",
    url: "https://action.wemove.eu/call/developers-testing-campaign-tweet-FR/?akid=.1172956.YowR8V",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
      "div:has(> textarea)",
    ],
  },
  {
    label: "twitter---KNOWN_USER_WHO_TOOK_ACTION",
    url: "https://action.wemove.eu/call/developers-testing-campaign-tweet-FR?action_id=6015993&akid=.1092948.qVK1J3",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
      "div:has(> textarea)",
    ],
  },
];
