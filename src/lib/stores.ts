import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type BreadCrumbs from '$lib/components/pillNavigation/Breadcrumbs.svelte';
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

export const mode = writable<Modi>('view');
export const currentRoute = writable<BreadCrumbs['$$prop_def']['routes']>();
