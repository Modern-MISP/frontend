<script lang="ts">
  import { lockViewMode } from '$lib/actions';
  import { mode } from '$lib/stores';
  import Histogram from '$lib/components/histogram/Histogram.svelte';
  $mode = 'view';

  /**
   * Page data containing the activity heatmap.
   */
  export let data;

  $: ({ histogramData, dataTypes } = data);
</script>

<svelte:window use:lockViewMode={true} />

<Histogram title="Histogram" description="This is a histogram" data={histogramData} {dataTypes} />
