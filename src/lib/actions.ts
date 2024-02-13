import type { Action } from 'svelte/action';
import { actionBarEntries, contextRouteEntries, lockModeToggle, mode } from './stores';
import type { ActionBarEntryProps } from './models/ActionBarEntry.interface';
import type { SideMenuRoute } from './components/menus/sidemenu/SideMenu.model';

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

export const contextRoutes: Action<HTMLElement, SideMenuRoute[]> = function (node, routes) {
  contextRouteEntries.set(routes);

  return {
    update(routes) {
      contextRouteEntries.set(routes);
    },
    destroy() {
      contextRouteEntries.set([]);
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

/**
 * Action for preventing the user from leaving view mode.
 * @param node html node that this action belongs to
 * @param enabled if true, view mode will be locked
 */
export const lockViewMode: Action<HTMLElement, boolean> = function (node, enabled) {
  let unsubscribe = mode.subscribe((m) => {
    lockModeToggle.set(enabled && m === 'view');
  });

  return {
    update(enabled) {
      unsubscribe();
      unsubscribe = mode.subscribe((m) => {
        lockModeToggle.set(enabled && m === 'view');
      });
    },
    destroy() {
      unsubscribe();
      lockModeToggle.set(false);
    }
  };
};
