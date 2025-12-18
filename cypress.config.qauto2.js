const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto2.forstudy.space/",
    env: {
      authUsername: "guest",
      authPassword: "welcome2qauto",
      testUserEmail: "auto_user_2@test.co",
      testUserPassword: "Password1!",
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/quato2",
      reportFilename: "qauto2-report-[datetime]",
      overwrite: true,
      html: true,
      json: true,
    },
  },
});
