import { defineConfig } from 'cypress';

export default defineConfig({
	fixturesFolder: 'cypress/fixtures',
	screenshotsFolder: 'cypress/screenshots',
	videosFolder: 'cypress/videos',
	e2e: {
		setupNodeEvents(on, config) {
			// setup plugins
		},
		baseUrl: 'http://localhost:3000',
	},
});
