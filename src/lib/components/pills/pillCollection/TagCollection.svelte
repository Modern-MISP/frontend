<script lang="ts" generics="T">
  import type { components } from '$lib/api/misp';
  import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { mode } from '$lib/stores';
  import { shouldTextBeBlack } from '$lib/util/color.util';
  import type { ComponentProps } from 'svelte';
  import EventPillCollectionCard from './PillCollectionWithDeleteAndAdd.svelte';

  /**
   * The Page data.
   */
  export let tags: components['schemas']['Tag'][];

  /**
   * The current mode of the page.
   */

  /**
   * The currently selected pills
   */
  export let selection: PickerPill<T>[] = [];

  let deletion: PickerPill<T>[] = [];

  let pills: ComponentProps<HrefPill>[] = [];

  function generatePills(includeAction: boolean) {
    pills = tags.map((y) => {
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
        action: undefined
      };

      if (includeAction)
        pill.action = {
          icon: 'mdi:delete-outline',
          class: 'hover:text-red',

          // On click remove pill from pills list and add to deletion list.
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
            } as unknown as PickerPill<T>; // Not cast safe.
            deletion = [...deletion, deletionPill];
          }
        };
      return pill;
    });
  }

  $: if (tags) generatePills($mode === 'edit');
</script>

<EventPillCollectionCard on:close on:save on:open bind:selection bind:deletion on:delete>
  <PillCollection base={HrefPill} {pills} />
</EventPillCollectionCard>
