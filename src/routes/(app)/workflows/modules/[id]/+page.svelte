<script lang="ts">
    import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
    import type { PageData } from './$types';
  
    /** Data that is displayed on this page. */
    export let data: PageData;
  
    const { infoHeader, module } = data;
 </script>
  
  <!--
    @component
    Displays information about a specific user, specified by `id`.
    
  -->
  <div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
    <DynCard header={infoHeader} data={module} />
  </div>