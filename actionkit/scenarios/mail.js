module.exports = [
  {
    label: "mail---UNKNOWN_USER",
    url: "https://action.wemove.eu/letter/developers-testing-campaign-letter-EN/",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "mail---KNOWN_USER_NEVER",
    url: "https://action.wemove.eu/act/developers-testing-campaign-letter-FR?akid=.1172942.fL7c2K",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "mail---KNOWN_USER_SUBSCRIBED",
    url: "https://action.wemove.eu/act/developers-testing-campaign-letter-FR?akid=.1172956.YowR8V",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "mail---KNOWN_USER_WHO_TOOK_ACTION",
    url: "https://action.wemove.eu/act/developers-testing-campaign-letter-FR?akid=.1093011.i3ZphJ",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
];
