const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto.forstudy.space/",

    env: {
      authUsername: "guest",
      authPassword: "welcome2qauto",
    },

    viewportWidth: 1920,
    viewportHeight: 1080,
    screenshotOnRunFailure: true,
    video: false,
    retries: {
      runMode: 2,
      openMode: 0,
    },

    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/tests",
      reportFilename: "report-[datetime]",
      overwrite: true,
      html: true,
      json: true,
    },
  },
});
