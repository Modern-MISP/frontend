<script lang="ts">
  import { lockEditMode } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import { mode } from '$lib/stores';

  $mode = 'edit';

  function editCallback(formData: Record<string, string>) {
    console.log(formData);
  }

  const Export: ActionBarEntryProps[] = [
    {
      icon: 'mdi:download',
      label: 'Export',
      action: () => {
        console.log('YAY');
      }
    }
  ];

  export let data;

  $: ({ header, title, description } = data);
</script>

<svelte:window use:lockEditMode={true} />

<Form callback={editCallback} additionalActions={Export}>
  <DynCard {header} data={{}} {title} {description}></DynCard>
</Form>
