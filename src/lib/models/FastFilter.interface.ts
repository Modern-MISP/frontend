import type { ComponentProps } from 'svelte';
import type ActiveEntry from '$lib/components/menus/topmenu/actionbar/ActiveEntry.svelte';

export type FastFilter = Omit<ComponentProps<ActiveEntry>, 'active'> & {
  ifActive: Record<string, string>;
};
