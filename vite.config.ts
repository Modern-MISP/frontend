import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    reporters: ['junit'],
    outputFile: 'report.xml',
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['cobertura', 'text']
    }
  }
});
