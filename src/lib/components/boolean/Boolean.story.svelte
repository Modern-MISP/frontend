<script lang="ts">
  import { themes } from '$lib/stores';
  import type { Hst } from '@histoire/plugin-svelte';
  import Boolean from './Boolean.svelte';
  export let Hst: Hst;

  let theme = 'macchiato';

  let isTrue = false;
</script>

<Hst.Story layout={{ type: 'grid' }}>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>

  <div class={theme}>
    <Hst.Variant title="default">
      <Boolean />
    </Hst.Variant>

    <Hst.Variant title="set with boolean type">
      <svelte:fragment slot="controls">
        <Hst.Checkbox title="isTrue" bind:value={isTrue} />
      </svelte:fragment>
      <Boolean {isTrue} />
    </Hst.Variant>

    <Hst.Variant title="Set with string type">
      <Boolean isTrue="true" />
    </Hst.Variant>
  </div>
</Hst.Story>
