<script lang="ts">
  import { actionBar } from '$lib/actions';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import { getFormValues } from '$lib/util/form.util';

  /**
   * The callback to call on submit.
   */
  export let callback: (formData: Record<string, string>) => void;

  let form: HTMLFormElement;

  const actions: ActionBarEntryProps[] = [
    {
      icon: 'material-symbols:save-outline',
      label: 'Save',
      action: () => {
        form.requestSubmit();
      }
    }
  ];
</script>

<svelte:window use:actionBar={actions} />
<form bind:this={form} on:submit|preventDefault={(e) => callback(getFormValues(e))} class="h-full">
  <slot />
</form>
