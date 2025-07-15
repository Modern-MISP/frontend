<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import EnableFilter from '../../galaxies/EnableFilter.svelte';

  interface Props {
    /** Page data containing the workflows table */
    data: any;
  }

  let { data }: Props = $props();

  let filterableTableData = $derived(data.tableData.map((d) => ({ ...d, enabled: !d.disabled })));

  let filtered: typeof filterableTableData = $state([]);
</script>

<!--
  @component
  Displays a table of all workflow modules except triggers.
-->
<ComplexTableLayout {...data} tableData={filtered}>
  {#snippet filter()}
    <div>
      <EnableFilter bind:data={filterableTableData} bind:filtered></EnableFilter>
    </div>
  {/snippet}
</ComplexTableLayout>
