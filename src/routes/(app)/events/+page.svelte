<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  import { POST } from '$lib/api';

  /**
   * Page data
   */
  export let data;
</script>

<!--
  @component
  Displays a list of all events.
  
-->

<ComplexTableLayout
  {...data}
  endpoint={(bodyOptions) => POST('/events/index', { body: { limit: 50, ...bodyOptions } })}
></ComplexTableLayout>
