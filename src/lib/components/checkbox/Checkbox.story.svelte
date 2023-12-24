<script lang="ts">
  import { themes } from '$lib/stores';
  import type { Hst } from '@histoire/plugin-svelte';
  import { logEvent } from 'histoire/client';
  import Checkbox from './Checkbox.svelte';
  export let Hst: Hst;

  let theme = 'macchiato';

  let checked = false;
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
    <Hst.Checkbox title="isTrue" bind:value={checked} />
  </svelte:fragment>

  <div class={theme}>
    <br />
    <Checkbox bind:checked on:change={(event) => logEvent('Change', event)} />
  </div>
</Hst.Story>
