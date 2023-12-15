import { POST } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const {
		data,
		error: mispError,
		response
	} = await POST('/events/index', { body: { page: 0, limit: 50 } });

	if (mispError) throw error(response.status, mispError.message);
	return {
		events: data
	};
};
