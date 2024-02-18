<script lang="ts">
  import { page } from '$app/stores';
  import AddGalaxyClusterForm from '$lib/components/addGalaxyClusterForm/AddGalaxyClusterForm.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import EventGalaxies from '$lib/components/pills/pillCollection/GalaxyCollection.svelte';
  import EventInfo from '../_components/EventInfo.svelte';
  import type { EventState } from '../_components/EventState.interface';
  import { attachCluster, detachCluster } from '../_components/event.util';
  import Card from '$lib/components/card/Card.svelte';
  import CardHeading from '$lib/components/card/CardHeading.svelte';

  /**
   *
   */
  export let data;
  let state: EventState = 'info';

  let selection: PickerPill<{ local_only: boolean; relation: string }>[] = [];
</script>

<EventInfo {data} bind:state>
  <svelte:fragment slot="add">
    <AddGalaxyClusterForm
      bind:selection
      on:createTag={() => (state = 'create')}
      on:close={() => (state = 'info')}
    />
  </svelte:fragment>

  <Card>
    <CardHeading>Galaxies</CardHeading>
    <EventGalaxies
      on:close={() => (state = 'info')}
      on:open={() => (state = 'add')}
      on:delete={({ detail }) =>
        detachCluster(detail.map((x) => ({ eventId: $page.params.id, id: x.value ?? '' })))}
      on:save={({ detail }) =>
        // @ts-expect-error svelte error. Does not detect the generic correctly.
        attachCluster(detail.map((x) => ({ ...x, eventId: $page.params.id })))}
      galaxies={data.event.Galaxy}
      bind:selection
    />
  </Card>
</EventInfo>
