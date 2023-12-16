import '../app.css';
import '@xyflow/svelte/dist/style.css';
import '$lib/stores'; // Needs to be imported to initialize settings on page load

export const ssr = false;
export const prerender = false;
