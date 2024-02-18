import type { ComponentProps } from 'svelte';
import type HrefEntry from '$lib/components/menus/topmenu/actionbar/HrefEntry.svelte';
import type CallbackEntry from '$lib/components/menus/topmenu/actionbar/CallbackEntry.svelte';

export type ActionBarEntryProps = ComponentProps<HrefEntry | CallbackEntry>;
