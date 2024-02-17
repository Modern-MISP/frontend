<script lang="ts">
  import Card from '$lib/components/card/Card.svelte';
  import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { mode } from '$lib/stores';
  import { shouldTextBeBlack } from '$lib/util/color.util';
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';
  import CardHeading from '$lib/components/card/CardHeading.svelte';

  /**
   * The Page data.
   */
  export let data: PageData;

  /**
   * The current mode of the page.
   */
  export let state: 'addTag' | 'info' | 'createTag';

  /**
   * The currently selected pills
   */
  export let selection: PickerPill[] = [];
</script>

<Card class="w-full ">
  <div class="flex justify-between">
    <CardHeading>Tags</CardHeading>
    {#if $mode === 'edit'}
      <button on:click={() => (state = state === 'addTag' ? 'info' : 'addTag')}>
        {#if state === 'addTag'}
          <Icon icon="mdi:close-circle-outline" class="text-2xl text-red" />
        {:else}
          <Icon icon="mdi:plus-circle-outline" class="text-2xl text-sky" />
        {/if}
      </button>
    {/if}
  </div>
  <PillCollection
    base={HrefPill}
    pills={(data.attribute?.Tag ?? []).map((y) => ({
      /// @ts-expect-error Wrong API spec
      icon: y.local == 0 ? 'mdi:cloud-off-outline' : 'mdi:earth',
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
  {#if state === 'addTag'}
    <div class="flex flex-col gap-4 p-2 border rounded-md border-text">
      <h3>Those tags will be added:</h3>
      <PillCollection pills={selection}></PillCollection>
    </div>
  {/if}
</Card>
