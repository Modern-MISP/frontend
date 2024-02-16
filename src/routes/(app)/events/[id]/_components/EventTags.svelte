<script lang="ts">
  import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { shouldTextBeBlack } from '$lib/util/color.util';
  import type { PageData } from '../$types';
  import EventPillCollectionCard from './EventPillCollectionCard.svelte';
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

<EventPillCollectionCard title="Tags" bind:state bind:selection>
  <PillCollection
    base={HrefPill}
    pills={(data.event?.Tag ?? []).map((y) => ({
      /// @ts-expect-error Wrong API spec
      icon: y.local == 1 ? 'mdi:cloud-off-outline' : 'mdi:earth',
      /// @ts-expect-error Wrong API spec
      label: y.relationship_type ? y.relationship_type : undefined,
      text: y.name,
      style: `background-color: ${y.colour}; color: ${
        shouldTextBeBlack(y.colour || '') ? 'black' : 'white'
      }`,
      href: `/tags/${y.id}`,
      enforceTextColor: false
    }))}
  />
</EventPillCollectionCard>
