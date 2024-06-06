<script lang="ts">
  import { actionBar } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';

  /**
   * Page data containing the data of the tag with the id in the url
   */
  export let data;
  $: ({ title, description } = data);

  function editCallback(formData: Record<string, string>) {
    console.log('editCallback', formData);
  }

  let formActions: ActionBarEntryProps[] = [];
</script>

<!--
    @component
    Shows information about a specific tag, specified by `id`.
-->
<!--
<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
  <DynCard {header} data={user} />
</div>
-->

<svelte:window
  use:actionBar={[
    {
      label: 'Delete Tag',
      class: 'hover:text-red',
      icon: 'mdi:delete-outline',
      action: () => {
        if (confirm('Are you sure you want to delete this tag?')) {
          console.log('delete tag');
        }
      }
    },
    ...formActions
  ]}
/>

<!--
@component Displays information about an tag specified by ID.

-->
<Form callback={editCallback} bind:actions={formActions}>
  <DynCard header={data.header} data={data.user} {title} {description} />
</Form>
