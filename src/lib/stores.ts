import type BreadCrumbs from '$lib/components/breadcrumbs/Breadcrumbs.svelte';
import type { ComponentProps } from 'svelte';
import { writable } from 'svelte/store';
import type { ActionBarEntryProps } from './models/ActionBarEntry.interface';
import type { Mode } from './models/Mode';
import { createLocalStorageStore, createTimeoutStore } from './util/store.util';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import { INITIAL_SETTINGS } from './settings';
import type { SideMenuRoute } from './components/menus/sidemenu/SideMenu.model';
import { PUBLIC_MAINTENANCE_MODE } from '$env/static/public';

export const actionBarEntries = writable<ActionBarEntryProps[]>([]);
export const contextRouteEntries = writable<SideMenuRoute[]>([]);
export const contextInfo = writable<string[]>([]);

export const settings = createLocalStorageStore(INITIAL_SETTINGS, 'settings');

export type Themes = (typeof themes)[number]['value'];
export const themes = [
  { value: 'mocha', label: 'Mocha' },
  { value: 'macchiato', label: 'Macchiato' },
  { value: 'frappe', label: 'Frappe' },
  { value: 'latte', label: 'Latte' }
] as const;

export const mode = writable<Mode>('view');
export const lockModeToggle = writable<boolean>(false);

// enforce view mode when in maintenance mode
if (PUBLIC_MAINTENANCE_MODE === 'true') {
  mode.subscribe(() => mode.set('view'));
}

export const currentRoute = writable<ComponentProps<BreadCrumbs>['routes']>();

export const notifications = createTimeoutStore<ComponentProps<Pill>>(8000);
