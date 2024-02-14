<script lang="ts">
  import Table from '../table/modularTable/Table.svelte';
  import Td from '../table/modularTable/Td.svelte';
  import Th from '../table/modularTable/Th.svelte';
  import Input from '../input/Input.svelte';
  import ActionCard from '../table/actions/card/ActionCard.svelte';
  import CallbackEntry from '../menus/topmenu/actionbar/CallbackEntry.svelte';

  export let map: Map<string, string> = new Map();

  let keyInput: Input;
  let valueInput: Input;

  let currentKey = '';
  let currentValue = '';
</script>

<ActionCard>
  <CallbackEntry
    label="Add entry"
    icon="mdi:plus"
    disabled={currentKey === '' || currentValue === ''}
    action={() => {
      map.set(currentKey, currentValue);
      map = map;
      keyInput.setValue('');
      currentKey = '';
      valueInput.setValue('');
      currentValue = '';
    }}
  ></CallbackEntry>
</ActionCard>
<Table>
  <thead>
    <tr>
      <Th label="Key" icon="mdi:key"></Th>
      <Th label="Value" icon="mdi:circle"></Th>
    </tr>
  </thead>
  <tbody>
    {#each map as [key, value]}
      <tr>
        <Td>{key}</Td>
        <Td>{value}</Td>
      </tr>
    {/each}
    <tr>
      <Td><Input bind:this={keyInput} on:value={({ detail }) => (currentKey = detail)} /></Td>
      <Td><Input bind:this={valueInput} on:value={({ detail }) => (currentValue = detail)} /></Td>
    </tr>
  </tbody>
</Table>
