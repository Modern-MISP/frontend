<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';

  export let data;
</script>

<DynCard data={data.tableData} header={data.header} />
