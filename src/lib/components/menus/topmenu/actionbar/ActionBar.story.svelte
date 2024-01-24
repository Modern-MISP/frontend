<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import ActionBar from './ActionBar.svelte';
  import { themes } from '$lib/stores';

  export let Hst: Hst;

  let theme = 'macchiato';

  let entries = [
    {
      icon: 'mdi:link',
      label: 'play Go!',
      action: 'https://aka-go.de/'
    },
    {
      icon: 'mdi:trash-can',
      label: 'delete',
      action: () => {
        alert('deleted!');
      }
    }
  ];
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>

  <div class={theme}>
    <ActionBar {entries} />
  </div>
</Hst.Story>
