<script lang="ts">
  import { lockEditMode } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { mode } from '$lib/stores';

  $mode = 'edit';

  function editCallback(formData: Record<string, string>) {
    console.log(formData);
  }

  export let data;

  $: ({ header } = data);
</script>

<svelte:window use:lockEditMode={true} />

<Form callback={editCallback}>
  <DynCard {header} data={{}}></DynCard>
</Form>
