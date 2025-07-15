<script lang="ts">
  import { preventDefault } from 'svelte/legacy';

  import { actionBar } from '$lib/actions';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import { getFormValues } from '$lib/util/form.util';

  /**
   * Additional classes to be applied to this component.
   */

  let form: HTMLFormElement = $state();

  /**
   * Default save action. You should bind to this.
   */
  export const actions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:close-circle-outline',
      label: 'Cancel',
      class: 'hover:text-ctp-red',
      action: () => {
        history.back();
      }
    },
    {
      icon: 'material-symbols:save-outline',
      label: 'Save',
      class: 'hover:text-ctp-green',
      action: () => {
        form.requestSubmit();
      }
    }
  ];

  interface Props {
    class?: string;
    /**
     * The callback to call on submit.
     */
    callback: (formData: Record<string, string>) => void;
    /**
     * Additional actions to display.
     */
    additionalActions?: ActionBarEntryProps[];
    children?: import('svelte').Snippet;
  }

  let { class: clazz = '', callback, additionalActions = [], children }: Props = $props();
</script>

<svelte:window use:actionBar={[...additionalActions, ...actions]} />
<form
  bind:this={form}
  onsubmit={preventDefault((e) => callback(getFormValues(e)))}
  class="h-full {clazz}"
>
  {@render children?.()}
</form>
