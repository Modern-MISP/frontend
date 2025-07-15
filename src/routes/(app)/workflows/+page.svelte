<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import EnableFilter from '../galaxies/EnableFilter.svelte';

  interface Props {
    /** Page data containing the workflows table */
    data: any;
  }

  let { data }: Props = $props();

  let { tableData, header, editActions } = $derived(data);

  let filterableTableData = $derived(tableData.map((d) => ({ ...d, enabled: d.enabled ?? true })));

  let filtered: typeof filterableTableData = $state([]);
</script>

<!--
  @component

  Displays a list of all workflows.
-->
<ComplexTableLayout
  tableHref={({ id }) => `/workflows/${id}`}
  {header}
  tableData={filtered}
  {editActions}
>
  {#snippet filter()}
    <div>
      <EnableFilter data={filterableTableData} bind:filtered></EnableFilter>
    </div>
  {/snippet}
</ComplexTableLayout>
