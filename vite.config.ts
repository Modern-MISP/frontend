import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
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
  server: {
    fs: {
      allow: ['config.yaml']
    }
  },
  build: {
    sourcemap: true,
    target: 'esnext'
  }
});
