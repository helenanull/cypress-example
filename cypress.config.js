/* eslint-disable global-require */
// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require('cypress')

module.exports = defineConfig({
    numTestsKeptInMemory: 15,
    defaultCommandTimeout: 15000,
    env: {
        apiUrl: 'https://training.bigbyte.academy/api',
        oldApiUrl: 'https://conduit.productionready.io/api',
        device: 'desktop',
        email: 'test@test.com',
        password: 'Cypress123'
    },
    retries: {
        runMode: 1,
        openMode: 0
    },
    userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36',
    viewportHeight: 768,
    viewportWidth: 1266,
    e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
        setupNodeEvents: function (on, config) {
            return require('./cypress/plugins/index.js')(on, config)
        },
        baseUrl: 'https://training.bigbyte.academy/#'
    }
})
