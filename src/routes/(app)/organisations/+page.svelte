<script lang="ts">
  import { api } from '$lib/api';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import { get } from 'svelte/store';

  /**
   * Page data
   */
  export let data;
</script>

<!--
  @component
  Displays a list of all organisations.
  
-->

<ComplexTableLayout
  {...data}
  endpoint={(bodyOptions) =>
    get(api).GET('/organisations/index', { body: { limit: 20, ...bodyOptions } })}
  tableHref={(x) => `/organisations/${x.uuid}`}
></ComplexTableLayout>
