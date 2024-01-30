<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import type { PageData } from './$types';

  /** Data that is displayed on this page. */
  export let data: PageData;

  const { header, user } = data;
</script>

<!--
    @component
    Shows information about a specific tag, specified by `id`.
-->
<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
  <DynCard {header} data={user} />
</div>
