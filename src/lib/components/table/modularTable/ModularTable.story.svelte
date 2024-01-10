<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import { themes } from '$lib/stores';
  import Table from './Table.svelte';
  import Th from './Th.svelte';

  import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
  import Info from '$lib/components/info/Info.svelte';
  import Pill from '$lib/components/pills/pill/Pill.svelte';
  import Tags from '$lib/components//pills//pillCollection/PillCollection.svelte';
  export let Hst: Hst;

  let theme = 'macchiato';

  const data = [
    {
      id: '1',
      email: 'admin@admin.test',
      key: 'ABC*********DEF',
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      date: new Date(),
      tags: [
        { icon: 'mdi:email', text: 'admin@admin.test', class: '!bg-red !text-white' },
        { icon: 'mdi:email', text: 'asdf', class: '!bg-peach !text-white' }
      ]
    },
    {
      id: '2',
      email: 'admin@admin.test',
      key: 'ABC*********DEF',
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      date: new Date(),
      tags: [
        { icon: 'mdi:email', text: 'admin@admin.test', class: '!bg-red !text-white' },
        { icon: 'mdi:email', text: 'asdf', class: '!bg-peach !text-white' }
      ]
    },
    {
      id: '3',
      email: 'test@admin.test',
      key: 'ABC*********DEF',
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      date: new Date(),
      tags: [
        { icon: 'mdi:email', text: 'admin@admin.test', class: '!bg-red !text-white' },
        { icon: 'mdi:email', text: 'asdf', class: '!bg-peach !text-white' }
      ]
    }
  ];
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>

  <div class={theme}>
    <Table>
      <tr>
        <Th icon="mdi:id-card" label="ID" />
        <Th icon="mdi:email" label="Email" />
        <Th icon="mdi:information" label="Info" />
        <Th icon="mdi:tag" label="Tags" />
        <Th icon="mdi:clock" label="Time" />
      </tr>

      {#each data as row}
        <tr>
          <td>
            <span class="text-lg">
              {row.id}
            </span>
          </td>
          <td>
            <Pill icon="mdi:email" text={row.email} />
          </td>
          <td>
            <Info text={row.info} />
          </td>
          <td>
            <Tags pills={row.tags} />
          </td>
          <td>
            <DatePill date={row.date} />
          </td>
        </tr>
      {/each}
    </Table>
  </div>
</Hst.Story>
