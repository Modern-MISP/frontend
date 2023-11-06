import { type RequestHandler, error } from '@sveltejs/kit';
import { GET as MISP_GET } from '$lib/api';
import { SECRET_MISP_KEY_ADMIN } from '$env/static/private';

export const GET: RequestHandler = async () => {
	// Hacky way to get the user id
	const { data } = await MISP_GET('/auth_keys', {});

	if (!data?.[0].User?.id)
		throw error(500, 'Internal Error. Should find the user corresponding to the auth key.');

	const userId = data[0].User.id;

	const { data: userData } = await MISP_GET('/admin/users/view/{userId}', {
		params: { path: { userId } },
		headers: {
			Authorization: SECRET_MISP_KEY_ADMIN
		}
	});

	return new Response(JSON.stringify(userData));
};
