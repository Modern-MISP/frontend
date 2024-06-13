<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  /**I think the pagination is not working, because the api does not support the request. I will still let it in, maybe they fix it in the future. */
  /**Page data containing data of the keys */
  export let data;

  $: ({ tableData } = data);
</script>

<!--
  @component
  Displays the list of all user keys.
  
-->

<ComplexTableLayout tableHref={(x) => `/admin/keys/${x.AuthKey?.id}`} {...data} {tableData}
></ComplexTableLayout>
