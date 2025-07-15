<script lang="ts">
  import { page } from '$app/state';
  import AddGalaxyClusterForm from '$lib/components/addGalaxyClusterForm/AddGalaxyClusterForm.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import EventGalaxies from '$lib/components/pills/pillCollection/GalaxyCollection.svelte';
  import EventInfo from '../_components/EventInfo.svelte';
  import type { EventState } from '../_components/EventState.interface';
  import { attachCluster, detachCluster } from '../_components/event.util';
  import Card from '$lib/components/card/Card.svelte';
  import CardHeading from '$lib/components/card/CardHeading.svelte';

  interface Props {
    /**
     * Page data of the galaxy form.
     */
    data: any;
  }

  let { data }: Props = $props();
  let eventState: EventState = $state('info');

  let selection: PickerPill<{ local_only: boolean; relation: string }>[] = $state([]);
</script>

<!--
    @component
    Displays the form for editing the galaxy cluster of an event.
-->

<EventInfo {data} bind:eventState>
  {#snippet add()}
    <AddGalaxyClusterForm
      bind:selection
      on:createTag={() => (eventState = 'create')}
      on:close={() => (evestState = 'info')}
    />
  {/snippet}

  <Card>
    <CardHeading>Galaxies</CardHeading>
    <EventGalaxies
      on:close={() => (evestState = 'info')}
      on:open={() => (eventState = 'add')}
      on:delete={({ detail }) =>
        detachCluster(detail.map((x) => ({ eventId: page.params.id, id: x.value ?? '' })))}
      on:save={({ detail }) =>
        // @ts-expect-error svelte error. Does not detect the generic correctly.
        attachCluster(detail.map((x) => ({ ...x, eventId: page.params.id })))}
      galaxies={data.event.Galaxy}
      bind:selection
    />
  </Card>
</EventInfo>
