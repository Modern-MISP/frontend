import { PUBLIC_DISABLE_AUTH } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const load = async () => {
  const token = localStorage.getItem('authToken');
  if (PUBLIC_DISABLE_AUTH === 'false' && !token) throw error(403, 'No Permissions!');
};
