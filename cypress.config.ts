import { defineConfig } from 'cypress';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  projectId: 'k7wfye',

  experimentalMemoryManagement: true,
  defaultCommandTimeout: 10000,

  retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 4,
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode: 0
  },

  component: {
    devServer: {
      framework: 'svelte',
      bundler: 'vite',
      // Cypress doesn't support the Vite SvelteKit plugin, only Svelte directly.
      // See https://github.com/cypress-io/cypress/issues/26064#issuecomment-1475437226
      viteConfig: () => {
        return {
          plugins: [svelte({ configFile: false, preprocess: [vitePreprocess()] })]
        };
      }
    }
  },

  e2e: {
    baseUrl: 'http://localhost:4173',
    viewportHeight: 1080,
    viewportWidth: 1920,

    excludeSpecPattern: [
      'cypress/e2e/events.cy.ts',
      'cypress/e2e/addGalaxyToEvent.cy.ts',
      'cypress/e2e/addTagToEvent.cy.ts',
      'cypress/e2e/eventgraphs.cy.ts',
      'cypress/e2e/workflows.cy.ts',
      'cypress/e2e/filterEvents.cy.ts'
    ],

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        const width = 1920;
        const height = 1080;

        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push(`--window-size=${width},${height}`);
          launchOptions.args.push('--force-device-scale-factor=1');
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--unsafely-treat-insecure-origin-as-secure=http://frontend:81');
        }

        return launchOptions;
      });
    }
  }
});
