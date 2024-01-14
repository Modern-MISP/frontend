<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import { mode } from '$lib/stores';
  import type { PageData } from './$types';
  import EditMode from './EditMode.svelte';

  import EventGalaxies from './EventGalaxies.svelte';
  import AddTagForm from './AddTagForm.svelte';
  import EventTags from './EventTags.svelte';
  import { editHeader, viewHeader } from './formHeaders';
  import type { Mode } from '$lib/models/Mode';

  /**
   * Page data containing the data of the event with the id in the url
   */
  export let data: PageData;

  let addTag = false;
</script>

<div class="h-full overflow-auto">
  <EditMode>
    <div class="grid gap-2 g lg:flex-nowrap">
      {#if addTag}
        <AddTagForm />
      {:else}
        <section class="h-full">
          <DynCard data={data.event} header={$mode === 'view' ? viewHeader : editHeader} />
        </section>
      {/if}
      <section class="h-full">
        <EventTags bind:addTag {data} />
      </section>

      <section class="h-full">
        <EventGalaxies {data} />
      </section>
    </div>
  </EditMode>
</div>

<style>
  .g {
    grid: 50rem 50rem / 1fr 1fr;
  }
</style>
