<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import { themes } from '$lib/stores';
  import DistributionPill from './DistributionPill.svelte';
  export let Hst: Hst;

  let theme = 'macchiato';
</script>

<Hst.Story layout={{ type: 'grid' }}>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>

  <div class={theme}>
    <Hst.Variant title="0">
      <DistributionPill distribution={0} />
    </Hst.Variant>
    <Hst.Variant title="1">
      <DistributionPill distribution={1} />
    </Hst.Variant>
    <Hst.Variant title="2">
      <DistributionPill distribution={2} />
    </Hst.Variant>
    <Hst.Variant title="3">
      <DistributionPill distribution={3} />
    </Hst.Variant>
    <Hst.Variant title="4">
      <DistributionPill distribution={4} />
    </Hst.Variant>
    <Hst.Variant title="5">
      <DistributionPill distribution={5} />
    </Hst.Variant>
  </div>
</Hst.Story>
