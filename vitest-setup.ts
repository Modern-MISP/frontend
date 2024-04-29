import '@testing-library/svelte/vitest';
import '@testing-library/jest-dom/vitest';

import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, vi } from 'vitest';
const fetchMocker = createFetchMock(vi);

fetchMocker.enableMocks();

beforeEach(() => {
  fetchMocker.mockIf('http://localhost:3000/config.yaml', () => {
    return '---\nMISP_API_ENDPOINT: http://localhost\n';
  });
});
