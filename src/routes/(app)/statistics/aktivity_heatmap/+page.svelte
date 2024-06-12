<script lang="ts">
  import { lockViewMode } from '$lib/actions';
  import { mode } from '$lib/stores';
  import Heatmap from '$lib/components/heatmap/Heatmap.svelte';

  $mode = 'view';

  export let data;

  $: ({ heatmapData, settings, title, description, dropdown } = data);
  $: console.log(dropdown);
</script>

<svelte:window use:lockViewMode={true} />

<Heatmap data={heatmapData} {settings} {title} {description} {dropdown} />
