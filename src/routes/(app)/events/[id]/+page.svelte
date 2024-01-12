<script lang="ts">
  import { mode } from '$lib/stores';
  import type { PageData } from './$types';
  import EditMode from './EditMode.svelte';
  import ViewMode from './ViewMode.svelte';

  /**
   * Page data containing the data of the event with the id in the url
   */
  export let data: PageData;
</script>

{#if $mode === 'view'}
  <ViewMode {data} />
{:else}
  <EditMode {data} />
{/if}
