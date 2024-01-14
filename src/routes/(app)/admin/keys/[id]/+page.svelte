<script>
  import { mode } from '$lib/stores';
  import Edit from './EditKey.svelte';
  import View from './ViewKey.svelte';
</script>

<!--
  @component
  Displays information about a specific auth key, specified by `id`.
  
-->
{#if $mode === 'edit'}
  <Edit />
{:else}
  <View />
{/if}
