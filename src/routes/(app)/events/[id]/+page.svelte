<script lang="ts">
  import Card from '$lib/components/card/Card.svelte';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import { shouldTextBeBlack } from '$lib/util/contrastColor.util';
  import type { PageData } from './$types';

  /**
   * Page data containing the data of the event with the id in the url
   */
  export let data: PageData;

  let { event, infoHeader } = data;

  console.log(event);
</script>

<div class="flex flex-wrap w-full h-full gap-2 lg:flex-nowrap">
  <DynCard data={event} header={infoHeader} />

  <Card class="w-full ">
    <h1 class="text-4xl">Tags</h1>
    <hr />
    <PillCollection
      pills={(event?.Tag ?? []).map((y) => ({
        icon: y.local == 0 ? 'mdi:cloud-off-outline' : 'mdi:earth',
        label: y.relationship_type ? y.relationship_type : undefined,
        text: y.name,
        style: `background-color: ${y.colour}; color: ${
          shouldTextBeBlack(y.colour || '') ? 'black' : 'white'
        }`
      }))}
    />
  </Card>
</div>
