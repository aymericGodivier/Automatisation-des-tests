const { defineConfig } = require("cypress");

module.exports = defineConfig({

  env: {
    username: 'test2@test.fr',
    password: 'testtest',
    unknownUsername: "unknownUser",
    unknownPassword: "unknownPassword",
    baseUrl: 'http://localhost:8080',
    APIUrl: 'http://localhost:8081'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
