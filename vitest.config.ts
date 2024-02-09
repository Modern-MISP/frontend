import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['junit'],
    outputFile: 'report.xml',
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['cobertura', 'text']
    }
  }
});
