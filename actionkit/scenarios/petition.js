module.exports = [
  {
    label: "petition--cookiebot---UNKNOWN_USER",
    url: "https://action.wemove.eu/sign/developers-testing-campaign-petition-EN/",
    cookiePath: "actionkit/reports/engine_scripts/no-cookie-bot.json",
    viewports: [
      {
        label: "lg",
        width: 1024,
        height: 3000,
      },
    ],
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "petition---UNKNOWN_USER",
    url: "https://action.wemove.eu/sign/developers-testing-campaign-petition-EN/",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "petition---KNOWN_USER_NEVER",
    url: "https://action.wemove.eu/sign/developers-testing-campaign-petition-EN/?akid=.1172942.fL7c2K",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "petition---KNOWN_USER_SUBSCRIBED",
    url: "https://action.wemove.eu/sign/developers-testing-campaign-petition-EN/?akid=.1172956.YowR8V",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "petition---KNOWN_USER_WHO_TOOK_ACTION",
    url: "https://action.wemove.eu/sign/developers-testing-campaign-petition-EN?akid=.1092286.VOgkBM&action_id=6010864",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "petition--form_validation",
    url: "https://action.wemove.eu/sign/developers-testing-campaign-petition-EN/",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    viewports: [
      {
        label: "lg",
        width: 1024,
        height: 1400,
      },
    ],
    clickSelector: "button[type=submit]",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "petition--pre_share_popup",
    url: "https://action.wemove.eu/sign/developers-testing-campaign-petition-IT/",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "petition--ended",
    url: "https://action.wemove.eu/sign/developers-testing-campaign-petition-PL/",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "petition--custom_questions_radio_buttons---UNKNOWN_USER",
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
    label: "petition--custom_questions_radio_buttons---KNOWN_USER_NEVER",
    url: "https://action.wemove.eu/sign/developers-testing-campaign-petition-radio-buttons-EN?akid=.1172942.fL7c2K",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "petition--custom_questions_radio_buttons---KNOWN_USER_SUBSCRIBED",
    url: "https://action.wemove.eu/sign/developers-testing-campaign-petition-radio-buttons-EN?akid=.1172956.YowR8V",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label:
      "petition--custom_questions_radio_buttons---KNOWN_USER_WHO_TOOK_ACTION",
    url: "https://action.wemove.eu/sign/developers-testing-campaign-petition-radio-buttons-EN?akid=.1092344.QIjH6e",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "petition--custom_questions_checkboxes---UNKNOWN_USER",
    url: "https://action.wemove.eu/sign/developers-testing-campaign-petition-checkbox-EN/",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "petition--custom_questions_checkboxes---KNOWN_USER_NEVER",
    url: "https://action.wemove.eu/sign/developers-testing-campaign-petition-checkbox-EN/?akid=.1172942.fL7c2K",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "petition--custom_questions_checkboxes---KNOWN_USER_SUBSCRIBED",
    url: "https://action.wemove.eu/sign/developers-testing-campaign-petition-checkbox-EN/?akid=.1172956.YowR8V",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
  {
    label: "petition--custom_questions_checkboxes---KNOWN_USER_WHO_TOOK_ACTION",
    url: "https://action.wemove.eu/sign/developers-testing-campaign-petition-checkbox-EN?akid=.1092346.rxTeMs",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [
      ".grecaptcha-badge",
      "[data-wm-floating-meter]",
      "[data-wm-recent-action]",
      "[data-wm-recent-comments]",
    ],
  },
];
