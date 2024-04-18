import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    reporters: ['junit', 'default'],
    outputFile: 'report.xml',
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['cobertura', 'text']
    },
    passWithNoTests: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts']
  },
  resolve: {
    conditions: mode === 'test' ? ['browser'] : []
  }
}));
