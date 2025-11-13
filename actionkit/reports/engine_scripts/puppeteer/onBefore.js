module.exports = async (page, scenario, viewport) => {
  await require('./loadCookies')(page, scenario);
};
