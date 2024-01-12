<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import { themes } from '$lib/stores';
  import LookupPill from './LookupPill.svelte';
  export let Hst: Hst;

  let theme = 'macchiato';
  const example = [
    {
      text: 'initial',
      icon: 'mdi:progress-question'
    },
    {
      text: 'ongoing',
      icon: 'mdi:progress-clock',
      class: 'text-peach uppercase'
    },
    {
      text: 'complete',
      icon: 'mdi:progress-check',
      class: 'text-green uppercase'
    }
  ];
</script>

<Hst.Story layout={{ type: 'grid' }}>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>

  <div class={theme}>
    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    {#each example as _, i}
      <Hst.Variant title={'' + i}>
        <LookupPill value={i} numberLookUp={example} />
      </Hst.Variant>
    {/each}
  </div>
</Hst.Story>
