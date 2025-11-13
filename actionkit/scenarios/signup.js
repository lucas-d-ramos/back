module.exports = [
  {
    label: "signup---UNKNOWN_USER",
    url: "https://action.wemove.eu/sign/developers-testing-campaign-petition-radio-buttons-EN/",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "signup---KNOWN_USER_NEVER",
    url: "https://action.wemove.eu/signup/wemove-join_en?akid=.1175197.Yi8y2W",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "signup---KNOWN_USER_SUBSCRIBED",
    url: "https://action.wemove.eu/signup/wemove-join_en?akid=.1175204.2_erAp",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "signup---KNOWN_USER_WHO_TOOK_ACTION",
    url: "https://action.wemove.eu/signup/wemove-join_en?akid=.1175188.XIbx64",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
];
