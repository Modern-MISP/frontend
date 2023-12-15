import { defineConfig } from 'cypress';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
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
    // setupNodeEvents(on, config) {
    // implement node event listeners here
    // },
  }
});
