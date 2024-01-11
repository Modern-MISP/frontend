<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import { themes } from '$lib/stores';
  import ThreatLevelPill from './ThreatLevelPill.svelte';
  export let Hst: Hst;

  let theme = 'macchiato';
</script>

<Hst.Story layout={{ type: 'grid' }}>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>

  <div class={theme}>
    <Hst.Variant title="0">
      <ThreatLevelPill threatLevel={0} />
    </Hst.Variant>
    <Hst.Variant title="1">
      <ThreatLevelPill threatLevel={1} />
    </Hst.Variant>
    <Hst.Variant title="2">
      <ThreatLevelPill threatLevel={2} />
    </Hst.Variant>
    <Hst.Variant title="3">
      <ThreatLevelPill threatLevel={3} />
    </Hst.Variant>
  </div>
</Hst.Story>
