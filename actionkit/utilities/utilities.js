const { argv } = require("node:process");

const IS_AK_TEST = argv.find((val) => val === "--akTest")?.length > 0;

const utilities = {
  getViewPorts: () => {
    const viewPorts = [
      {
        label: "smartphone",
        width: 768,
        height: 1000,
      },
      // {
      //   label: "tablet",
      //   width: 940,
      //   height: 1000,
      // },
      // {
      //   label: "desktop",
      //   width: 1024,
      //   height: 1000,
      // },
    ];

    return IS_AK_TEST ? [viewPorts[2]] : viewPorts;
  },

  getScenarios: () => {
    const scenarios = [
      ...require("./../scenarios/embedded"),
      // ...require("./../scenarios/facebook"),
      // ...require("./../scenarios/mail"),
      // ...require("./../scenarios/opt-out"),
      // ...require("./../scenarios/petition"),
      // ...require("./../scenarios/share"),
      // ...require("./../scenarios/signup"),
      // ...require("./../scenarios/survey"),
      // ...require("./../scenarios/thanks"),
      // ...require("./../scenarios/twitter"),
      // ...require("./../scenarios/youmove-petition"),
    ];

    if (IS_AK_TEST) {
      scenarios.map((scenario) => {
        const tempQS = scenario.url.split("?")[1];
        let akTestUrl = scenario.url.split("?")[0];

        akTestUrl =
          akTestUrl.slice(-1) === "/"
            ? akTestUrl.substring(0, akTestUrl.length - 1)
            : akTestUrl;

        akTestUrl = `${akTestUrl}?template_set=TestingFrontEnd&${tempQS}`;

        scenario.url = akTestUrl;

        console.log(`-------------
URL: ${akTestUrl}
-------------`);

        return scenario;
      });
    }

    return scenarios;
  },
};

module.exports = utilities;
