import type { Action } from 'svelte/action';
import { actionBarEntries, contextInfo, contextRouteEntries, lockModeToggle, mode } from './stores';
import type { ActionBarEntryProps } from './models/ActionBarEntry.interface';
import type { SideMenuRoute } from './components/menus/sidemenu/SideMenu.model';
import { get } from 'svelte/store';

/**
 * Action for setting action bar entries.
 * @param node html node that this action belongs to
 * @param actions action bar entries to set
 */
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
 * Action for setting current context routes for the side menu.
 * @param node html node that this action belongs to
 * @param routes side menu routes to set as current context routes
 */
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
 * Action for adding a message to the context info.
 * @param node html node that this action belongs to
 * @param param1 info message and condition for when to add it to the context
 */
export const addContextInfo: Action<HTMLElement, { message: string; condition?: boolean }> =
  function (node, { message, condition = true }) {
    let currentInfo = get(contextInfo);
    let index: number | undefined = undefined;

    const add = (newMessage: string) => {
      // add new info message and remember index
      index = currentInfo.length;
      contextInfo.set([...currentInfo, newMessage]);
    };

    if (condition) {
      add(message);
    }

    return {
      update({ message: newMessage, condition: newCondition = true }) {
        currentInfo = get(contextInfo);
        if (index === undefined && newCondition) {
          // no index means message is currently not added;
          // condition being true indicates it should be
          add(newMessage);
        } else if (index !== undefined && !newCondition) {
          // message is added, but shouldn't be => remove
          currentInfo.splice(index, 1);
          contextInfo.set(currentInfo);
          index = undefined;
        } else if (index !== undefined) {
          // message is added and should be => just update message
          currentInfo[index] = newMessage;
          contextInfo.set(currentInfo);
        }
        // else: message is not added and should't be => do nothing
      },
      destroy() {
        if (index !== undefined) {
          currentInfo = get(contextInfo);
          currentInfo.splice(index, 1);
          contextInfo.set(currentInfo);
        }
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
    if (enabled) lockModeToggle.set(m === 'edit');
  });

  return {
    update(enabled) {
      unsubscribe();
      // update lock state
      lockModeToggle.set(enabled && get(mode) === 'edit');
      // update subscription
      unsubscribe = mode.subscribe((m) => {
        if (enabled) lockModeToggle.set(m === 'edit');
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
    if (enabled) lockModeToggle.set(m === 'view');
  });

  return {
    update(enabled) {
      unsubscribe();
      // update lock state
      lockModeToggle.set(enabled && get(mode) === 'view');
      // update subscription
      unsubscribe = mode.subscribe((m) => {
        if (enabled) lockModeToggle.set(m === 'view');
      });
    },
    destroy() {
      unsubscribe();
      lockModeToggle.set(false);
    }
  };
};
