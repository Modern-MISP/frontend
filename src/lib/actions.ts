import type { Action } from 'svelte/action';
import { actionBarEntries } from './stores';
import type { ActionBarEntryProps } from './models/ActionBarEntry.interface';

export const actionBar: Action<HTMLElement, ActionBarEntryProps[]> = function (node, actions) {
  actionBarEntries.set(actions);

  return {
    update(actions) {
      actionBarEntries.set(actions);
    },
    destroy() {
      actionBarEntries.set([]);
    }
  };
};
