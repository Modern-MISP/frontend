<script>
  import { mode } from '$lib/stores';
  import Edit from './EditKey.svelte';
  import View from './ViewKey.svelte';
</script>

{#if $mode === 'edit'}
  <Edit />
{:else}
  <View />
{/if}
