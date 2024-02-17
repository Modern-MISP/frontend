<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<!--
  @component
  Displays a list of all remote servers of the instance.
  
-->

<ComplexTableLayout {...data} tableHref={(x) => `/admin/servers/${x.Server?.id}`}
></ComplexTableLayout>
