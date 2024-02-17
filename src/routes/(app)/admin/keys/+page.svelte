<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  export let data;

  $: ({ tableData } = data);
</script>

<!--
  @component
  All user keys. I think the pagination is not working, because the api does not support the request. I will still let it in, maybe they fix it in the future.
  
-->

<ComplexTableLayout tableHref={(x) => `/admin/keys/${x.AuthKey?.id}`} {...data} {tableData}
></ComplexTableLayout>
