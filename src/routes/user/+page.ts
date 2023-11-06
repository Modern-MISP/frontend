import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const myuser = await fetch('/api/users/me').then((r) => r.json());

	return {
		myuser
	};
};
