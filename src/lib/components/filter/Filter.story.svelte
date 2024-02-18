<script lang="ts">
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import Filter from '$lib/components/filter/Filter.svelte';
  import { themes } from '$lib/stores';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import type { Hst } from '@histoire/plugin-svelte';
  export let Hst: Hst;

  let theme = 'macchiato';

  const fil = createTableHeadGenerator<undefined>();
  const filter = [
    fil({
      label: 'Value',
      value: () => 'value'
    }),
    // In the current api published does not need to be an boolean. That's why we could use the string return from an input checkbox
    fil({
      label: 'Published',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'published'
        }
      })
    }),
    fil({
      label: 'Type',
      value: () => 'type'
    }),
    fil({
      label: 'Search all',
      value: () => 'seachall'
    }),
    // You can override the page limit with this.

    fil({
      label: 'Page Limit',
      value: () => 'limit'
    })
  ];
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>

  <div class={theme}>
    <Filter header={filter} />
  </div>
</Hst.Story>
