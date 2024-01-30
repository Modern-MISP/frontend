import { redirect } from '@sveltejs/kit';

export const load = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) throw redirect(307, '/login');

  throw redirect(307, '/events');
};
