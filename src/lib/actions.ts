import type { Action } from "svelte/action";
import type { ActionBarEntry } from "./models/ActionBarEntry.interface";
import { actionBarEntries } from "./stores";

export const actionBar: Action<HTMLElement, Array<ActionBarEntry>> = function(node, actions) {
    actionBarEntries.set(actions);

    return {
      update(actions) {
        actionBarEntries.set(actions);
      },
      destroy() {
        actionBarEntries.set([]);
      }
    }
  }