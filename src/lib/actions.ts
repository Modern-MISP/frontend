import type { Action } from 'svelte/action';
import { actionBarEntries, contextRouteEntries } from './stores';
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
