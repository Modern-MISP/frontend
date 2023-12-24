<script lang="ts">
  import { themes } from '$lib/stores';
  import type { Hst } from '@histoire/plugin-svelte';
  import Icon from '@iconify/svelte';
  import { logEvent } from 'histoire/client';
  import Button from './Button.svelte';
  export let Hst: Hst;

  let theme = 'macchiato';

  let value = 'Hallo Welt!';
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
    <Hst.Text title="ButtonValue" bind:value />
  </svelte:fragment>

  <div class={theme}>
    <Button on:click={(event) => logEvent('Click', event)}>
      <b>{value}</b>
      <Icon icon="mdi-light:home" class="w-8 h-8" />
    </Button>
  </div>
</Hst.Story>
