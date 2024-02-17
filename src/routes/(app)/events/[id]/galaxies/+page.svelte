<script lang="ts">
  import { page } from '$app/stores';
  import AddGalaxyClusterForm from '$lib/components/addGalaxyClusterForm/AddGalaxyClusterForm.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import EventGalaxies from '../_components/EventGalaxies.svelte';
  import EventInfo from '../_components/EventInfo.svelte';
  import type { EventState } from '../_components/EventState.interface';
  import { attachCluster } from '../_components/event.util';

  /**
   *
   */
  export let data;
  let state: EventState = 'add';

  let selection: PickerPill[] = [];
</script>

<EventInfo {data} bind:state>
  <svelte:fragment slot="add">
    <AddGalaxyClusterForm
      bind:selection
      on:createTag={() => (state = 'create')}
      on:close={() => (state = 'info')}
      on:add={({ detail }) =>
        attachCluster(detail.map((x) => ({ ...x, eventId: $page.params.id })))}
    />
  </svelte:fragment>

  <EventGalaxies bind:state {data} bind:selection />
</EventInfo>
