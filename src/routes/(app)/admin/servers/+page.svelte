<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import type { PageData } from './$types';

  interface Props {
    /**Page data containing data of the servers */
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<!--
  @component
  Displays a list of all remote servers of the instance.

-->

<ComplexTableLayout {...data} tableHref={(x) => `/admin/servers/${x.Server?.id}`}
></ComplexTableLayout>
