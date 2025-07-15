<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import type { PageData } from './$types';

  interface Props {
    /** Page data of an module specified by `id` in the url */
    data: PageData;
  }

  let { data }: Props = $props();

  const { infoHeader, module, title, description } = data;
</script>

<!--
    @component
    Displays information about a specific user, specified by `id`.

  -->
<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
  <DynCard header={infoHeader} data={module} {title} {description} />
</div>
