<script lang="ts">
  import { lockViewMode } from '$lib/actions';
  import { appState } from '$lib/stores.svelte.ts';
  import Histogram from '$lib/components/histogram/Histogram.svelte';
  appState.mode = 'view';

  interface Props {
    /**
     * Page data containing the Attribute Histogramm.
     */
    data: any;
  }

  let { data }: Props = $props();

  let { histogramData, dataTypes } = $derived(data);
</script>

<svelte:window use:lockViewMode={true} />

<!--
    @component
    Displays the Attribute Histogramm.
 -->
<Histogram title="Histogram" description="This is a histogram" data={histogramData} {dataTypes} />
