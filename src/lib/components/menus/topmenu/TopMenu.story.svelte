<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import TopMenu from './TopMenu.svelte';
  import { themes } from '$lib/stores';

  export let Hst: Hst;

  let theme = 'macchiato';
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>

  <div class={theme}>
    <TopMenu />
  </div>
</Hst.Story>
