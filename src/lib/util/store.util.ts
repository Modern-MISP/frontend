import { browser } from '$app/environment';
import { isEqual, isEqualWith } from 'lodash-es';
import { writable } from 'svelte/store';
import { getTypeDeep } from './ts.util';
/**
 * Create a store that saves to the localStorage on write. And on initial load loads from the localStorage.
 * @param init initial value some default initial value, in case the localStorage does not contain the key.
 * @param key the key of the object inside the localStorage
 * @returns  a svelte store
 */
export const createLocalStorageStore = <T>(init: T, key: string) => {
  if (browser) {
    const localSettings = JSON.parse(localStorage.getItem(key) || '{}');

    // localStorage key is compatible with intended default value
    const typesAreEqual = isEqualWith(localSettings, init, (a, b) =>
      isEqual(getTypeDeep(a), getTypeDeep(b))
    );

    if (typesAreEqual) init = localSettings;
  }

  const { subscribe, set, update } = writable<T>(init);

  function saveOnSet(value: T) {
    if (browser) localStorage.setItem(key, JSON.stringify(value));
    set(value);
  }

  return {
    subscribe,
    set: saveOnSet,
    update
  };
};

/**
 * Creates a store that contains an array. Each added item will be removed after your specified timeout.
 * @param timeout the amount of time after wich the element will be removed in ms.
 * @returns a svelte store containing an array out our provided type.
 */
export const createTimeoutStore = <T>(timeout: number) => {
  const { subscribe, update } = writable<T[]>([]);

  function add(value: T) {
    update((x) => [...x, value]);

    setTimeout(() => {
      removeOne(value);
    }, timeout);
  }

  function removeOne(value: T) {
    update((update) => update.filter((x) => x !== value));
  }

  return {
    subscribe,
    remove: removeOne,
    add
  };
};
