<script>
  import AttributeList from './AttributeList.svelte';

  export let data;
</script>

<!--
    @component
    
-->

<AttributeList data={data.tableData} />
