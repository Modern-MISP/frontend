<script lang="ts">
  import Table from '../table/modularTable/Table.svelte';
  import Td from '../table/modularTable/Td.svelte';
  import Th from '../table/modularTable/Th.svelte';
  import Input from '../input/Input.svelte';

  /**
   * The map of key value pairs.
   */
  export let map: Map<string, string>;
</script>

<Table>
  <thead>
    <tr>
      <Th label="Key" icon="mdi:key"></Th>
      <Th label="Value" icon="mdi:circle"></Th>
    </tr>
  </thead>
  <tbody>
    {#each [...map.entries(), ['', '']] as [key, value]}
      <tr>
        <Td
          ><Input
            value={key}
            on:value={({ detail }) => {
              map.delete(key);
              if (detail || value) {
                map.set(detail, value);
              }
              map = map;
            }}
          ></Input></Td
        >
        <Td
          ><Input
            {value}
            on:value={({ detail }) => {
              if (key || detail) {
                map.set(key, detail);
              } else {
                map.delete(key);
              }
              map = map;
            }}
          ></Input></Td
        >
      </tr>
    {/each}
  </tbody>
</Table>
