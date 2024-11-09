<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';

  export let data;

  const { blueprint, infoHeader } = data;
</script>

<!--
  @component
  Display of all the information about a specific workflow-blueprint.
-->

<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
  <DynCard header={infoHeader} data={blueprint} />
</div>
