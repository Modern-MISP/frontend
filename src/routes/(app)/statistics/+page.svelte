<script lang="ts">
  import { lockViewMode } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { mode } from '$lib/stores';

  $mode = 'view';

  function editCallback(formData: Record<string, string>) {
    console.log(formData);
  }

  export let data;

  $: ({ header } = data);
</script>

<svelte:window use:lockViewMode={true} />

<Form callback={editCallback}>
  <DynCard {header} data={{}}></DynCard>
</Form>
