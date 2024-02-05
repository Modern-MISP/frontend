<script lang="ts">
  import { actionBar } from '$lib/actions';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';

  let form: HTMLFormElement;
  $: if (form) console.log(new FormData(form));

  const submit = ({ currentTarget }: SubmitEvent) => {
    if (!(currentTarget && currentTarget instanceof HTMLFormElement)) return;

    const data = new FormData(currentTarget);
    console.log(data);
  };

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
