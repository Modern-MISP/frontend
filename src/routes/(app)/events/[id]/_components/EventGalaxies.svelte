<script lang="ts">
  import EventPillCollectionCard from './EventPillCollectionCard.svelte';

  import CardHeading from '$lib/components/card/CardHeading.svelte';
  import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { mode } from '$lib/stores';
  import { isEqual, merge } from 'lodash-es';
  import { type ComponentProps } from 'svelte';
  import type { PageData } from '../$types';
  import type { EventState } from './EventState.interface';
  import { detachCluster } from './event.util';
  import { page } from '$app/stores';

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

  let pillsByGalaxy: Record<string, ComponentProps<HrefPill>[]>;

  function generatePills(includeAction: boolean) {
    if (!data.event.Galaxy) return;
    pillsByGalaxy = merge(
      {},
      ...data.event.Galaxy.map((x: (typeof data.event.Galaxy)[number]) => ({
        [x.id!]:
          x.GalaxyCluster?.map((y) => {
            const pill: ComponentProps<HrefPill> = {
              icon: y.local ? 'mdi:cloud-off-outline' : 'mdi:earth',
              label: y.relationship_type ? y.relationship_type : undefined,
              text: y.value,
              href: `/galaxies/clusters/${y.id}`,
              action: undefined
            };
            if (includeAction)
              pill.action = {
                icon: 'mdi:delete-outline',
                class: 'hover:text-red',
                onClick: () => {
                  pillsByGalaxy[x.id!] = pillsByGalaxy[x.id!].filter((x) => !isEqual(x, pill)); // Idk why x !== pill doesn't work. I guess the references are different. Anyway, this works.
                  const deletionPill = {
                    ...pill,
                    value: y.tag_id,
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
              };

            return pill;
          }) ?? []
      }))
    );
  }

  $: if (data) generatePills($mode === 'edit');
</script>

<EventPillCollectionCard
  title="Galaxies"
  bind:state
  bind:selection
  bind:deletion
  on:delete={({ detail }) =>
    detachCluster(detail.map((x) => ({ eventId: $page.params.id, id: x.value ?? '' })))}
>
  {#each data.event?.Galaxy ?? [] as galaxy}
    <a href="/galaxies/{galaxy.id}">
      <CardHeading class="py-2 pt-3 text-xl">{galaxy.name}</CardHeading>
    </a>
    <PillCollection base={HrefPill} pills={pillsByGalaxy[galaxy.id ?? '']} />
  {/each}
</EventPillCollectionCard>
