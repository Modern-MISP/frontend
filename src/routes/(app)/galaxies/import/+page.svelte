<script lang="ts">
  import { POST } from '$lib/api';
  import Button from '$lib/components/button/Button.svelte';
  import Card from '$lib/components/card/Card.svelte';
  import { mode } from '$lib/stores';
  import { getFormValues } from '$lib/util/form.util';
  import Icon from '@iconify/svelte';

  $mode = 'edit';

  async function submit(event: SubmitEvent) {
    const { galaxies } = getFormValues(event)[0];
    if (typeof galaxies !== 'string') return;
    try {
      const parsed = JSON.parse(galaxies);

      const { error: _error, data } = await POST('/galaxies/import', { fetch, body: parsed });
      if (_error) {
        error = `Server responded with error: ${JSON.stringify(_error, null, 2)}`;
        success = '';
        return;
      }

      error = '';
      success = JSON.stringify(data);
    } catch (_error) {
      success = '';
      error = `Your input could not be parsed. Error is: ${JSON.stringify(_error, null, 2)}`;
    }
  }
  let error = '';
  let success = '';
</script>

<form class="h-full" on:submit|preventDefault={submit}>
  <Card>
    <h1 class="text-xl">Import Galaxies</h1>
    {#if error}
      <span class="text-red"><b>Error:</b> {error}</span>
    {/if}
    {#if success}
      <span class="text-green"><b>Success:</b> {success}</span>
    {/if}

    <textarea
      class="w-full h-full p-2 border rounded-md outline-none bg-surface0 border-sky"
      name="galaxies"
    ></textarea>

    <Button class="self-end gap-2 w-min text-sky">
      <Icon icon="mdi:import"></Icon>
      Import
    </Button>
  </Card>
</form>
