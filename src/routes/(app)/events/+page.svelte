<script lang="ts">
  import { api } from '$lib/api';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import { get } from 'svelte/store';

  interface Props {
    /**
     * Page data
     */
    data: any;
  }

  let { data }: Props = $props();
</script>

<!--
  @component
  Displays a list of all events.

-->

<ComplexTableLayout
  {...data}
  endpoint={(bodyOptions) => get(api).POST('/events/index', { body: { limit: 5, ...bodyOptions } })}
></ComplexTableLayout>
