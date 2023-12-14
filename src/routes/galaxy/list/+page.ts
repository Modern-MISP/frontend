import { GET } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const { data, error: mispError, response } = await GET('/galaxies');

	if (mispError) throw error(response.status, mispError.message);
	return {
		galaxies: data
	};
};
