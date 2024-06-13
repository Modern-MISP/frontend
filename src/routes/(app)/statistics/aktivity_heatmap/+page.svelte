<script lang="ts">
  import { lockViewMode } from '$lib/actions';
  import { mode } from '$lib/stores';
  import Heatmap from '$lib/components/heatmap/Heatmap.svelte';

  $mode = 'view';

  /**
   * Page data containing the activity heatmap.
   */
  export let data;

  $: ({ heatmapData, settings, title, description, dropdown } = data);
  $: console.log(dropdown);
</script>

<svelte:window use:lockViewMode={true} />

<!-- 
    @component
    Displays the activity heatmap.
 -->
<Heatmap data={heatmapData} {settings} {title} {description} {dropdown} />
