const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'https://wave-trial.getbynder.com/',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'mochawesome-report/reports',
      html: true,
    },
    defaultBrowser: 'chrome',
    retries: 2,
    screenshotsFolder: 'mochawesome-report/assets',
    supportFile: 'cypress/support/e2e.js',
  },
});
