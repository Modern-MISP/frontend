import { browser } from '$app/environment';
import type BreadCrumbs from '$lib/components/breadcrumbs/Breadcrumbs.svelte';
import type { ComponentType, SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';
import type { ActionBarEntry } from './models/ActionBarEntry.interface';
const createSettingsStore = <T>(init: T) => {
  const { subscribe, set, update } = writable<T>(init);

  function saveOnSet(value: T) {
    if (browser) localStorage.setItem('settings', JSON.stringify(value));
    set(value);
  }

  return {
    subscribe,
    set: saveOnSet,
    update
  };
};

export const actionBarEntries = writable<Array<ActionBarEntry>>([]);

let init: {
  theme: Themes;
  openOnInit: boolean;
  tableMaxSize: boolean;
} = {
  theme: 'mocha',
  openOnInit: true,
  tableMaxSize: false
};

if (browser) {
  const localSettings = JSON.parse(localStorage.getItem('settings') || '{}');
  if (isSetting(localSettings)) init = localSettings;
}

/**
 * TODO: finish this typeguard
 */
function isSetting(toCheck: unknown): toCheck is typeof init {
  return (
    typeof toCheck === 'object' && toCheck !== null && 'theme' in toCheck && 'openOnInit' in toCheck
  );
}

export const settings = createSettingsStore(init);

export type Themes = (typeof themes)[number]['value'];
export const themes = [
  { value: 'mocha', label: 'Mocha' },
  { value: 'macchiato', label: 'Macchiato' },
  { value: 'frappe', label: 'Frappe' },
  { value: 'latte', label: 'Latte' }
] as const;

export type Modi = 'view' | 'edit';

export const mode = writable<Modi>('edit');
export const currentRoute = writable<BreadCrumbs['$$prop_def']['routes']>();
