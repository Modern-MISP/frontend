<script lang="ts">
  import { actionBar } from '$lib/actions';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import { merge, uniq } from 'lodash-es';

  /**
   * The callback to call on submit.
   */
  export let callback: (
    formData: Record<string, FormDataEntryValue | FormDataEntryValue[]>[]
  ) => void;

  let form: HTMLFormElement;

  function submit({ currentTarget }: SubmitEvent) {
    if (!currentTarget || !(currentTarget instanceof HTMLFormElement)) return;

    const data = new FormData(currentTarget);

    const keys = uniq([...data.keys()]);
    const entries = merge(
      {},
      ...keys.map((key) => {
        // Get all values from that name inputs.
        const values = data.getAll(key);
        // Handles arrays. If there are multiple inputs with the same name they most be an array. Elsewise there is only one input. So no need too but it into an array.
        return { [key]: values.length > 1 ? values : values[0] };
      })
    );

    callback(entries);
  }

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
<form bind:this={form} on:submit|preventDefault={submit}>
  <slot />
</form>
