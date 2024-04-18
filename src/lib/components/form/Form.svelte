<script lang="ts">
  import { actionBar } from '$lib/actions';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import { getFormValues } from '$lib/util/form.util';

  /**
   * The callback to call on submit.
   */
  export let callback: (formData: Record<string, string>) => void;

  let form: HTMLFormElement;

  /**
   * Default save action. You should bind to this.
   */
  export const actions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:close-circle-outline',
      label: 'Cancel',
      class: 'hover:text-red',
      action: () => {
        history.back();
      }
    },
    {
      icon: 'material-symbols:save-outline',
      label: 'Save',
      class: 'hover:text-green',
      action: () => {
        form.requestSubmit();
      }
    }
  ];

  /**
   * Additional actions to display.
   */
  export let additionalActions: ActionBarEntryProps[] = [];
</script>

<svelte:window use:actionBar={[...additionalActions, ...actions]} />
<form bind:this={form} on:submit|preventDefault={(e) => callback(getFormValues(e))} class="h-full">
  <slot />
</form>
