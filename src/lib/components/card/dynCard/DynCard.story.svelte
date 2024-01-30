<script lang="ts" generics="T">
  import Info from '$lib/components/info/Info.svelte';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import { TABLE_DATA } from '$lib/components/table/dynTable/exampleTableData';
  import DynCard from './DynCard.svelte';
  import type { Hst } from '@histoire/plugin-svelte';
  import { themes } from '$lib/stores';
  export let Hst: Hst;

  let theme = 'macchiato';

  const col = createTableHeadGenerator<(typeof TABLE_DATA)[0]>();

  const header = [
    col({
      key: 'id',
      label: 'ID',
      value: (x) => ({ display: Info, props: { text: x.description } })
    }),
    col({ key: 'name', label: 'Name', value: (x) => x.name }),
    col({
      key: 'description',
      label: 'Description',
      value: (x) => x.description
    })
  ];
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>

  <div class={theme}>
    <DynCard {header} data={TABLE_DATA[0]} />
  </div>
</Hst.Story>
