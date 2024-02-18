<script lang="ts">
  import { lockViewMode } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
    import { mode } from '$lib/stores';
  import type { PageData } from './$types';

  /** Data that is displayed on this page. */
  export let data: PageData;

  const { header, user } = data;

  $mode = 'view';
</script>

<!--
    @component
    Shows information about a specific tag, specified by `id`.
-->

<svelte:window use:lockViewMode={true} />

<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
  <DynCard {header} data={user} />
</div>
