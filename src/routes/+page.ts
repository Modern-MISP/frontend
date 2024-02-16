import { token } from '$lib/api';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const load = async () => {
  if (!get(token)) redirect(307, '/login');

  redirect(307, '/events');
};
