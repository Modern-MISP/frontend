<script lang="ts">
  import { actionBar } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import type { PageData } from './$types';

  interface Props {
    /** Page data containing the data of the organisation */
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<!--
  @component

  Information about a organisation specified by 'id'.

-->

<div class="w-full lg:w-5/6 xl:w-1/2">
  <DynCard header={data.header} data={data.data} />
</div>

<svelte:window use:actionBar={[]} />
