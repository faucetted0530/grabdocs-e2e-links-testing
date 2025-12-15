const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://grabdocs.com', // OR http://localhost:3000
  },
});
