import { defineConfig } from 'cypress'

export default defineConfig({
	projectId: 'e2vmma',
	fixturesFolder: false,
	viewportHeight: 1300,
	viewportWidth: 1800,
	requestTimeout: 20000,
	pageLoadTimeout: 60000,
	defaultCommandTimeout: 20000,
	screenshotOnRunFailure: true,
	video: true,
	videoUploadOnPasses: false,
	e2e: {
		// We've imported your old cypress plugins here.
		// You may want to clean this up later by importing these.
		setupNodeEvents(on, config) {
			return require('./cypress/plugins/index.js')(on, config)
		},
		baseUrl: 'http://localhost:3002',
		specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
	},
})
