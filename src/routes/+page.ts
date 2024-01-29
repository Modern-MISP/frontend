import { redirect } from '@sveltejs/kit';

export const load = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) redirect(307, '/login');
  redirect(307, '/events');
};
