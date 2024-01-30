<script lang="ts">
    import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
    import type { PageData } from './$types';
  
    /** Data that is displayed on this page. */
    export let data: PageData;
  
    const { left, right, server } = data;
 </script>
<!--
    @component
    Displays information about a specific remote server, specified by `id`.
    
-->
<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
    <DynCard header={left} data={server} />
    <DynCard header={right} data={server} />
</div>