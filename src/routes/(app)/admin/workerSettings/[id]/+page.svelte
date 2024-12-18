<script lang="ts">
  import type { PageData } from './$types';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';

  /** Page data containing data of the users with the 'id' in the url */
  export let data: PageData;

  $: ({ left, right, user } = data);
</script>

<!--
  @component
  Displays information about a specific worker, specified by `id`.
-->

<div class="flex flex-wrap w-full h-full gap-2 lg:flex-nowrap">
  <DynCard header={left} data={user} />
  <DynCard header={right} data={user} />
</div>
