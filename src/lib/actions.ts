import type { Action } from 'svelte/action';
import { actionBarEntries, lockModeToggle, mode } from './stores';
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

/**
 * Action for preventing the user from leaving edit mode.
 * @param node html node that this action belongs to
 * @param enabled if true, edit mode will be locked
 */
export const lockEditMode: Action<HTMLElement, boolean> = function (node, enabled) {
  let unsubscribe = mode.subscribe((m) => {
    lockModeToggle.set(enabled && m === 'edit');
  });

  return {
    update(enabled) {
      unsubscribe();
      unsubscribe = mode.subscribe((m) => {
        lockModeToggle.set(enabled && m === 'edit');
      });
    },
    destroy() {
      unsubscribe();
      lockModeToggle.set(false);
    }
  };
};
