<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import type { PageData } from './$types';
  import EditMode from './EditMode.svelte';
  import { header } from './formHeaders';

  /**
   * Page data containing the data of the attribute with the id in the url
   */
  export let data: PageData;
</script>

<!--
    @component
    Displays information about a specific attribute, specified by `id`.
    
  -->
<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
  <EditMode>
    <DynCard {header} data={data.attribute} />
  </EditMode>
</div>
