<script lang="ts">
  import { lockViewMode } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { mode } from '$lib/stores';

  $mode = 'view';

  function editCallback(formData: Record<string, string>) {
    console.log(formData);
  }

  /**
   * Page data containing usage data information.
   */
  export let data;

  $: ({ header, title, description } = data);
</script>

<svelte:window use:lockViewMode={true} />

<!-- 
    @component
    Displays the statistics page.
 -->
<Form callback={editCallback}>
  <DynCard {header} data={{}} {title} {description}></DynCard>
</Form>
