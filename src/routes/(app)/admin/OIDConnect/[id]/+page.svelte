<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';

  /**
   * Page data containing the data of the provider with the 'id' in the url
   */
  export let data;
  $: ({ title, description } = data);

  function editCallback(formData: Record<string, string>) {
    console.log('editCallback', formData);
  }

  let formActions: ActionBarEntryProps[] = [];
</script>

<!--
<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
  <DynCard {header} data={user} />
</div>
-->

<!--
@component Displays information about a provider specified by 'id'.

-->
<Form callback={editCallback} bind:actions={formActions}>
  <DynCard header={data.header} data={data.user} {title} {description} />
</Form>
