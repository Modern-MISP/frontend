<script lang="ts">
  import EventPillCollectionCard from './EventPillCollectionCard.svelte';

  import CardHeading from '$lib/components/card/CardHeading.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import type { PageData } from '../$types';
  import type { EventState } from './EventState.interface';
  import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
  import type { ComponentProps } from 'svelte';
  import { merge } from 'lodash-es';

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
  /**
   * Pills that are marked for deletion
   */
  export let deletion: PickerPill[] = [];

  let pillsByGalaxy: Record<string, ComponentProps<HrefPill>[]> = merge(
    {},
    ...(data.event.Galaxy ?? []).map((x) => {
      return {
        // @ts-expect-error asdf
        [x.id!]: x.GalaxyCluster.map((y) => {
          const pill = {
            icon: y.local ? 'mdi:cloud-off-outline' : 'mdi:earth',
            label: y.relationship_type ? y.relationship_type : undefined,
            text: y.value,
            href: `/galaxies/clusters/${y.id}`,
            // On click remove pill from pills list and add to deletion list.
            action: {
              icon: 'mdi:delete-outline',
              class: 'hover:text-red',
              onClick: () => {
                pillsByGalaxy = {
                  ...pillsByGalaxy,
                  [x.id!]: pillsByGalaxy[x.id!].filter((x) => x !== pill)
                };
                const deletionPill = {
                  ...pill,
                  value: x.id,
                  // Add an restore option, that adds the pill back to the pill array.
                  action: {
                    icon: 'mdi:restore',
                    class: 'hover:text-green',
                    onClick: () => {
                      deletion = deletion.filter((x) => x !== deletionPill);
                      pillsByGalaxy[x.id!] = [...pillsByGalaxy[x.id!], pill];
                    }
                  }
                };
                deletion = [...deletion, deletionPill];
              }
            }
          };
          return pill;
        })
      };
    })
  );
</script>

<EventPillCollectionCard title="Galaxies" bind:state bind:selection bind:deletion>
  {#each data.event?.Galaxy ?? [] as galaxy}
    <a href="/galaxies/{galaxy.id}">
      <CardHeading class="py-2 pt-3 text-xl">{galaxy.name}</CardHeading>
    </a>
    <PillCollection base={HrefPill} pills={pillsByGalaxy[galaxy.id ?? '']} />
  {/each}
</EventPillCollectionCard>
