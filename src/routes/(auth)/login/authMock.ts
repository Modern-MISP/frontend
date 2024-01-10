import { error } from '@sveltejs/kit';

export async function login({ email, password }: { email: string; password: string }) {
  console.log(email, password);

  if (email === 'admin@admin.test' && password === 'admin') {
    return true;
  }
  throw error(401, 'wrong credentials. They be email: admin@admin.test & password: admin');
}
