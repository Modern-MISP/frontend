<script lang="ts">
  import Table from '../table/modularTable/Table.svelte';
  import Td from '../table/modularTable/Td.svelte';
  import Th from '../table/modularTable/Th.svelte';
  import Input from '../input/Input.svelte';

  /**
   * The map of key value pairs.
   */
  export let entries: [string, string][];

  function onBlur() {
    entries = [...new Map(entries.filter(([k, v]) => k || v)).entries()];
  }
</script>

<Table>
  <thead>
    <tr>
      <Th label="Key" icon="mdi:key"></Th>
      <Th label="Value" icon="mdi:circle"></Th>
    </tr>
  </thead>
  <tbody>
    {#each [...entries, ['', '']] as [key, value], i}
      <tr>
        <Td
          ><Input
            value={key}
            on:blur={onBlur}
            on:value={({ detail }) => {
              entries[i] = [detail, value];
            }}
          ></Input></Td
        >
        <Td
          ><Input
            {value}
            on:blur={onBlur}
            on:value={({ detail }) => {
              entries[i] = [key, detail];
            }}
          ></Input></Td
        >
      </tr>
    {/each}
  </tbody>
</Table>
