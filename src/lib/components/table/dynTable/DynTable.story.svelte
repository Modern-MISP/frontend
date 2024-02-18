<script lang="ts">
  import Info from '$lib/components/info/Info.svelte';
  import { themes } from '$lib/stores';
  import type { Hst } from '@histoire/plugin-svelte';
  import { createTableHeadGenerator } from '../../../util/tableBuilder.util';
  import type { DynTableHeadExtent } from './DynTable.model';
  import DynTable from './DynTable.svelte';
  import { TABLE_DATA } from './exampleTableData.mock';
  import Boolean from '$lib/components/boolean/Boolean.svelte';

  export let Hst: Hst;

  let theme = 'macchiato';

  const data = TABLE_DATA;
  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    col({ key: 'id', icon: 'mdi:id-card', label: 'ID', value: (x) => x.id }),
    col({
      key: 'boolean',
      icon: 'mdi:check',
      label: 'Boolean',
      value: (x) => ({ display: Boolean, props: { isTrue: !x.disabled } })
    }),
    col({ key: 'name', icon: 'mdi:account-outline', label: 'Name', value: (x) => x.name }),
    col({
      key: 'description',
      icon: 'mdi:information-outline',
      label: 'Description',
      value: (x) => ({ display: Info, props: { text: x.description } })
    })
  ];
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>

  <div class={theme}>
    <DynTable {header} {data} />
  </div>
</Hst.Story>
