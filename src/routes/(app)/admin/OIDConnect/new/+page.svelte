<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { currentRoute, mode } from '$lib/stores';
  import { lockEditMode } from '$lib/actions';
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ header } = data);

  $mode = 'edit';

  function editCallback() {}

  $: $currentRoute = [
    ...($currentRoute ?? []),
    { name: 'New Provider', href: 'new', icon: 'mdi:plus-outline' }
  ];
</script>

<svelte:window use:lockEditMode={true} />

<Form callback={editCallback}>
  <DynCard {header} data={{}}></DynCard>
</Form>
