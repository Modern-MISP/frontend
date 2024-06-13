<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import type { PageData } from './$types';

  /** Page data of an module specified by `id` in the url */
  export let data: PageData;

  const { infoHeader, module, title, description } = data;
</script>

<!--
    @component
    Displays information about a specific user, specified by `id`.
    
  -->
<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
  <DynCard header={infoHeader} data={module} {title} {description} />
</div>
