const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto.forstudy.space/",
    env: {
      authUsername: "guest",
      authPassword: "welcome2qauto",
      testUserEmail: "auto_user_1@test.co",
      testUserPassword: "Password1!",
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/quato",
      reportFilename: "qauto1-report-[datetime]",
      overwrite: true,
      html: true,
      json: true,
    },
  },
});
