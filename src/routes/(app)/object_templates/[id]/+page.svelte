<script lang="ts">
  import { actionBar } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import type { PageData } from './$types';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  /** Page data containing the data of the object template */
  export let data: PageData;
</script>

<!--
  @component
  
  Information about a object template specified by 'id'.

-->

<div class="w-full lg:w-5/6 xl:w-1/2">
  <DynCard header={data.objectTemplateHeader} data={data.objectTemplate} />
</div>

<!--
Add all object template elements
-->
<ComplexTableLayout {...data.objectTemplateElements}></ComplexTableLayout>

<svelte:window use:actionBar={[]} />
