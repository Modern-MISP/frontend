<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import { themes } from '$lib/stores';
  import Select from './Select.svelte';
  export let Hst: Hst;

  let theme = 'macchiato';
  const options = [
    {
      value: 'test1',
      label: 'Test 1'
    },

    {
      value: 'test2',
      label: 'Test 2'
    }
  ];

  let value = 'test1';
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
    <Hst.Text title="Current value" bind:value />
  </svelte:fragment>

  <div class={theme}>
    <Select {options} bind:value />
  </div>
</Hst.Story>
