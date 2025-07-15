<script lang="ts">
  import { lockViewMode } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { appState } from '$lib/stores.svelte.ts';

  appState.mode = 'view';

  function editCallback(formData: Record<string, string>) {
    console.log(formData);
  }

  interface Props {
    /**
     * Page data containing usage data information.
     */
    data: any;
  }

  let { data }: Props = $props();

  let { header, title, description } = $derived(data);
</script>

<svelte:window use:lockViewMode={true} />

<!--
    @component
    Displays the statistics page.
 -->
<Form callback={editCallback}>
  <DynCard {header} data={{}} {title} {description}></DynCard>
</Form>
