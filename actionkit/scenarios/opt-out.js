module.exports = [
  {
    label: "opt_out---KNOWN_USER",
    url: "https://action.wemove.eu/unsubscribe/unsubscribe_en?t=17&akid=1347%2E124%2EIHCe9v",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [".grecaptcha-badge"],
  },
  {
    label: "opt_out---UNKNOWN_USER",
    url: "https://action.wemove.eu/unsubscribe/unsubscribe_en/",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [".grecaptcha-badge"],
  },
  {
    label: "opt_out---thanks",
    url: "https://action.wemove.eu/thanks/unsubscribe_en?share=1&akid=1347.124.IHCe9v&action_id=2240123&consent=nolang",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [".grecaptcha-badge"],
  },
];
