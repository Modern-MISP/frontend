import { browser } from '$app/environment';
import type BreadCrumbs from '$lib/components/breadcrumbs/Breadcrumbs.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import type { ComponentProps } from 'svelte';
import { writable } from 'svelte/store';
import type { ActionBarEntryProps } from './models/ActionBarEntry.interface';
import type { Mode } from './models/Mode';
import { INITIAL_SETTINGS } from './settings';
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

export const actionBarEntries = writable<ActionBarEntryProps[]>([]);
let init = INITIAL_SETTINGS;

if (browser) {
  const localSettings = JSON.parse(localStorage.getItem('settings') || '{}');
  if (isSetting(localSettings)) init = localSettings;
}

// TODO: finish this typeguard
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

export const mode = writable<Mode>('view');
export const currentRoute = writable<ComponentProps<BreadCrumbs>['routes']>();

const createNotificationStore = (timeout: number) => {
  const { subscribe, update } = writable<ComponentProps<Pill>[]>([]);

  function add(value: ComponentProps<Pill>) {
    update((x) => [...x, value]);

    setTimeout(() => {
      removeOne(value);
    }, timeout);
  }

  function removeOne(value: ComponentProps<Pill>) {
    update((update) => update.filter((x) => x !== value));
  }

  return {
    subscribe,
    remove: removeOne,
    add
  };
};
export const notifications = createNotificationStore(3000);
