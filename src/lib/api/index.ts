import createClient from 'openapi-fetch';
import type { paths } from './misp'; // generated from openapi-typescript
import { PUBLIC_MISP_KEY } from '$env/static/public';

export const { DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE } = createClient<paths>({
	baseUrl: 'http://localhost',
	headers: {
		Authorization: PUBLIC_MISP_KEY,
		Accept: 'application/json',
		'Content-type': 'application/json'
	}
});
