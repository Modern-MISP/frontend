<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  import type { PageData } from './$types';

  interface Props {
    /**Page data of the provider table */
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<!--
  @component
  Displays a list of all current providers.

-->
<ComplexTableLayout {...data} tableHref={(x) => `/admin/OIDConnect/${x.id}`}></ComplexTableLayout>
