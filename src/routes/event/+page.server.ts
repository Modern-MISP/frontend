import { GET } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { data, error: mispError, response } = await GET('/events');

	if (mispError) throw error(response.status, mispError.message);
	return {
		events: data
	};
};
