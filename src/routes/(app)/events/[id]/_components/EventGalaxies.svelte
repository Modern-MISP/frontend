<script lang="ts">
  import EventPillCollectionCard from './EventPillCollectionCard.svelte';

  import CardHeading from '$lib/components/card/CardHeading.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import type { PageData } from '../$types';
  import type { EventState } from './EventState.interface';

  /**
   * The Page data.
   */
  export let data: PageData;

  /**
   * The current mode of the page.
   */
  export let state: EventState;

  /**
   * The currently selected pills
   */
  export let selection: PickerPill[] = [];
</script>

<EventPillCollectionCard title="Galaxies" bind:state bind:selection>
  {#each data.event?.Galaxy ?? [] as galaxy}
    <a href="/galaxies/{galaxy.id}">
      <CardHeading class="py-2 pt-3 text-xl">{galaxy.name}</CardHeading>
    </a>
    <PillCollection
      pills={galaxy.GalaxyCluster
        ? galaxy.GalaxyCluster.map((y) => ({
            icon: y.local ? 'mdi:cloud-off-outline' : 'mdi:earth',
            label: y.relationship_type ? y.relationship_type : undefined,
            text: y.value
          }))
        : []}
    />
  {/each}
</EventPillCollectionCard>
