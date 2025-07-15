<script lang="ts" generics="T">
  import { run } from 'svelte/legacy';

  import type { components } from '$lib/api/misp';
  import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { appState } from '$lib/stores.svelte.ts';
  import { shouldTextBeBlack } from '$lib/util/color.util';
  import type { ComponentProps } from 'svelte';
  import EventPillCollectionCard from './PillCollectionWithDeleteAndAdd.svelte';

  /**
   * The current mode of the page.
   */

  interface Props {
    /**
     * The Page data.
     */
    tags: components['schemas']['Tag'][];
    /**
     * The currently selected pills
     */
    selection?: PickerPill<T>[];
  }

  let { tags, selection = $bindable([]) }: Props = $props();

  let deletion: PickerPill<T>[] = $state([]);

  let pills: ComponentProps<HrefPill>[] = $state([]);

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
          class: 'hover:text-ctp-red',

          // On click remove pill from pills list and add to deletion list.
          onClick: () => {
            pills = pills.filter((x) => x !== pill);
            const deletionPill = {
              ...pill,

              value: y.id,
              // Add an restore option, that adds the pill back to the pill array.
              action: {
                icon: 'mdi:restore',
                class: 'hover:text-ctp-green',
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

  run(() => {
    if (tags) generatePills(appState.mode === 'edit');
  });
</script>

<EventPillCollectionCard on:close on:save on:open bind:selection bind:deletion on:delete>
  <PillCollection base={HrefPill} {pills} />
</EventPillCollectionCard>
