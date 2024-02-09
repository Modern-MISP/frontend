import type CallbackEntry from '$lib/components/menus/topmenu/actionbar/CallbackEntry.svelte';
import type { ComponentProps } from 'svelte';

export type DynCardActionHeader<T> = Omit<ComponentProps<CallbackEntry>, 'action'> & {
  action: (x: T) => void;
};
