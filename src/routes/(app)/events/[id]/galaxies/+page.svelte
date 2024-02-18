<script lang="ts">
  import { page } from '$app/stores';
  import AddGalaxyClusterForm from '$lib/components/addGalaxyClusterForm/AddGalaxyClusterForm.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import EventGalaxies from '$lib/components/pills/pillCollection/GalaxyCollection.svelte';
  import EventInfo from '../_components/EventInfo.svelte';
  import type { EventState } from '../_components/EventState.interface';
  import { attachCluster, detachCluster } from '../_components/event.util';

  /**
   *
   */
  export let data;
  let state: EventState = 'info';

  let selection: PickerPill[] = [];
</script>

<EventInfo {data} bind:state>
  <svelte:fragment slot="add">
    <AddGalaxyClusterForm
      bind:selection
      on:createTag={() => (state = 'create')}
      on:close={() => (state = 'info')}
      on:add={({ detail }) => {
        attachCluster(detail.map((x) => ({ ...x, eventId: $page.params.id })));
        selection = [];
      }}
    />
  </svelte:fragment>

  <EventGalaxies
    on:close={() => (state = 'info')}
    on:open={() => (state = 'add')}
    on:delete={({ detail }) =>
      detachCluster(detail.map((x) => ({ eventId: $page.params.id, id: x.value ?? '' })))}
    galaxies={data.event.Galaxy}
    bind:selection
  />
</EventInfo>
