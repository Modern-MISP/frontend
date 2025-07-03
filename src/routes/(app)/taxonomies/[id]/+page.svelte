<script lang="ts">
  import { actionBar } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import type { PageData } from './$types';

  /** Page data containing the data of the taxonomy */
  export let data: PageData;
</script>

<!--
  @component
  
  Information about a taxonomy specified by 'id'.

-->

<div class="w-full lg:w-5/6 xl:w-1/2">
  <DynCard header={data.header} data={data.data} />
</div>

<svelte:window use:actionBar={[]} />
