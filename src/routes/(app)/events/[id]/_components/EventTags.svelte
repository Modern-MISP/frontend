<script lang="ts">
  import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { shouldTextBeBlack } from '$lib/util/color.util';
  import Icon from '@iconify/svelte';
  import type { PageData } from '../$types';
  import EventPillCollectionCard from './EventPillCollectionCard.svelte';
  import type { EventState } from './EventState.interface';
  import { page } from '$app/stores';
  import { deleteTags } from './event.util';

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

  let pills = (data.event?.Tag ?? []).map((y) => {
    const pill = {
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
      action: {
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
      }
    };
    return pill;
  });

  const _deleteTags = () => {
    deleteTags(deletion.map((x) => ({ eventId: $page.params.id, id: x.value! })));
    deletion = [];
  };
</script>

<EventPillCollectionCard title="Tags" bind:state bind:selection>
  <PillCollection base={HrefPill} {pills} />

  <div class="relative flex flex-col gap-4 p-2 border rounded-md border-text" slot="footer">
    <h3>Those elements will be deleted:</h3>
    <PillCollection pills={deletion}></PillCollection>

    <button
      on:click={_deleteTags}
      class="absolute p-2 text-2xl text-white rounded-md bg-red right-2 bottom-2"
    >
      <Icon icon="mdi:delete-outline"></Icon>
    </button>
  </div>
</EventPillCollectionCard>
