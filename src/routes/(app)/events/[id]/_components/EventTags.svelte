<script lang="ts">
  import { page } from '$app/stores';
  import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { shouldTextBeBlack } from '$lib/util/color.util';
  import type { ComponentProps } from 'svelte';
  import type { PageData } from '../$types';
  import EventPillCollectionCard from './EventPillCollectionCard.svelte';
  import type { EventState } from './EventState.interface';
  import { deleteTags } from './event.util';
  import { mode } from '$lib/stores';

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

  let deletion: PickerPill[] = [];

  let pills: ComponentProps<HrefPill>[] = [];

  function generatePills(includeAction: boolean) {
    if (!data.event?.Tag) return;
    pills = data.event.Tag.map((y) => {
      const pill: ComponentProps<HrefPill> = {
        /// @ts-expect-error Wrong API spec
        icon: y.local == 1 ? 'mdi:cloud-off-outline' : 'mdi:earth',
        /// @ts-expect-error Wrong API spec
        label: y.relationship_type ? y.relationship_type : undefined,
        text: y.name,
        style: `background-color: ${y.colour}; color: ${
          shouldTextBeBlack(y.colour || '') ? 'black' : 'white'
        }`,
        href: `/tags/${y.id}`,
        enforceTextColor: false,
        // On click remove pill from pills list and add to deletion list.
        action: undefined
      };

      if (includeAction)
        pill.action = {
          icon: 'mdi:delete-outline',
          class: 'hover:text-red',
          onClick: () => {
            pills = pills.filter((x) => x !== pill);
            const deletionPill = {
              ...pill,
              value: y.id,
              // Add an restore option, that adds the pill back to the pill array.
              action: {
                icon: 'mdi:restore',
                class: 'hover:text-green',
                onClick: () => {
                  deletion = deletion.filter((x) => x !== deletionPill);
                  pills = [...pills, pill];
                }
              }
            };
            deletion = [...deletion, deletionPill];
          }
        };
      return pill;
    });
  }

  $: if (data) generatePills($mode === 'edit');
</script>

<EventPillCollectionCard
  title="Tags"
  bind:state
  bind:selection
  bind:deletion
  on:delete={({ detail }) =>
    deleteTags(detail.map((x) => ({ eventId: $page.params.id, id: x.value ?? '' })))}
>
  <PillCollection base={HrefPill} {pills} />
</EventPillCollectionCard>
