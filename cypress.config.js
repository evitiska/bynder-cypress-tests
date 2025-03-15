const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'https://wave-trial.getbynder.com/',
    reporter: 'mochawesome',
    video: false,
    reporterOptions: {
      reportDir: 'mochawesome-report/reports',
      overwrite: false,
      html: false,
      json: true,
    },
    retries: 2,
    screenshotsFolder: 'mochawesome-report/assets',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
