module.exports = [
  {
    label: "share",
    url: "https://action.wemove.eu/thanks/developers-testing-campaign-tweet-EN?share=1",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [".grecaptcha-badge"],
  },
  {
    label: "share--only_share_with_video_no_cookie_accepted_video_placeholder",
    url: "https://action.wemove.eu/thanks/developers-testing-campaign-sharing-EN?share=1",
    cookiePath: "actionkit/reports/engine_scripts/no-cookie-bot.json",
    hideSelectors: [".grecaptcha-badge", "#CybotCookiebotDialog"],
  },
  {
    label: "share--only_share_with_video",
    url: "https://action.wemove.eu/thanks/developers-testing-campaign-sharing-EN?share=1",
    cookiePath: "actionkit/reports/engine_scripts/cookie-bot.json",
    hideSelectors: [".grecaptcha-badge", "#CybotCookiebotDialog", "iframe"],
  },
];
