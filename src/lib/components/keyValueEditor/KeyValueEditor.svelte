<script lang="ts">
  import Table from '../table/modularTable/Table.svelte';
  import Td from '../table/modularTable/Td.svelte';
  import Th from '../table/modularTable/Th.svelte';
  import Input from '../input/Input.svelte';

  /**
   * The map of key value pairs.
   */
  export let map: Map<string, string>;

  // FIXME: Currently, this behaves really weirdly when typing the same key twice.
  // While the same key obviously shouldn't be allowed twice anyways,
  // this also happens while typing the name of a key that begins with the name of a key that is already in the list.
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
              const entries = [...map.entries()];
              const index = entries.findIndex(([k]) => k === key);
              map.delete(key);
              if (detail || value) {
                if (index >= 0) {
                  map = new Map([
                    ...entries.slice(0, index),
                    [detail, value],
                    ...entries.slice(index + 1)
                  ]);
                } else {
                  map.set(detail, value);
                }
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
