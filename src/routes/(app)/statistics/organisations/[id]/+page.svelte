<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import { lockViewMode } from '$lib/actions';

  interface Props {
    /**
     * Page data containing the data of the organisation with the 'id' in the url
     */
    data: any;
  }

  let { data }: Props = $props();
  let { title, description } = $derived(data);

  function editCallback(formData: Record<string, string>) {
    console.log('editCallback', formData);
  }

  let formActions: ActionBarEntryProps[] = $state([]);
</script>

<!--
    @component
    Shows information about a specific organisation, specified by `id`.
-->
<!--
<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
  <DynCard {header} data={user} />
</div>
-->

<svelte:window use:lockViewMode={true} />

<!--
@component Displays information about an organisation specified by 'id'.

-->
<Form callback={editCallback} bind:actions={formActions}>
  <DynCard header={data.header} data={data.user} {title} {description} />
</Form>
