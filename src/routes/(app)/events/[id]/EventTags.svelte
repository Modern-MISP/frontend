<script lang="ts">
  import type { PageData } from './$types';
  import Card from '$lib/components/card/Card.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import { shouldTextBeBlack } from '$lib/util/contrastColor.util';
  import { mode } from '$lib/stores';
  import Icon from '@iconify/svelte';

  /**
   * The Page data.
   */
  export let data: PageData;

  /**
   * The current mode of the page.
   */
  export let addTag = false;
</script>

<Card class="w-full ">
  <div class="flex justify-between">
    <h1 class="text-4xl">Tags</h1>
    {#if $mode === 'edit'}
      <button on:click={() => (addTag = !addTag)}>
        {#if addTag}
          <Icon icon="mdi:close-circle-outline" class="text-4xl text-red" />
        {:else}
          <Icon icon="mdi:plus-circle-outline" class="text-4xl text-sky" />
        {/if}
      </button>
    {/if}
  </div>
  <hr />
  <PillCollection
    pills={(data.event?.Tag ?? []).map((y) => ({
      /// @ts-expect-error fuck this fucking API spec
      icon: y.local == 0 ? 'mdi:cloud-off-outline' : 'mdi:earth',
      /// @ts-expect-error see above
      label: y.relationship_type ? y.relationship_type : undefined,
      text: y.name,
      style: `background-color: ${y.colour}; color: ${
        shouldTextBeBlack(y.colour || '') ? 'black' : 'white'
      }`
    }))}
  />
</Card>
