<script lang="ts">
  import { lockViewMode } from '$lib/actions';
  import { appState } from '$lib/stores.svelte.ts';
  import Heatmap from '$lib/components/heatmap/Heatmap.svelte';

  appState.mode = 'view';

  interface Props {
    /**
     * Page data containing the activity heatmap.
     */
    data: any;
  }

  let { data }: Props = $props();

  let { heatmapData, settings, title, description, dropdown } = $derived(data);
</script>

<svelte:window use:lockViewMode={true} />

<!--
    @component
    Displays the activity heatmap.
 -->
<Heatmap data={heatmapData} {settings} {title} {description} {dropdown} />
