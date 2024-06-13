<script lang="ts">
  import { lockEditMode } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { mode } from '$lib/stores';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  $mode = 'edit';

  function editCallback(formData: Record<string, string>) {
    console.log(formData);
  }

  /**
   * Page data containing security information about the user.
   */
  export let data;

  $: ({ header } = data.card);
  $: ({ tableData, topMenuActions } = data.table);
</script>

<svelte:window use:lockEditMode={true} />

<!--
  @component
  Displays the information security settings page.

-->
<ComplexTableLayout
  tableHref={(x) => `/settings/security/${x.AuthKey?.id}`}
  {...data.table}
  {tableData}
></ComplexTableLayout>

<Form callback={editCallback} additionalActions={topMenuActions}>
  <DynCard {header} data={{}}></DynCard>
</Form>
