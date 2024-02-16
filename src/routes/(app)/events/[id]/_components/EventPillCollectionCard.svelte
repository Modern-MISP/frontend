<script lang="ts">
  import Card from '$lib/components/card/Card.svelte';
  import CardHeading from '$lib/components/card/CardHeading.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { mode } from '$lib/stores';
  import Icon from '@iconify/svelte';
  import type { EventState } from './EventState.interface';

  /**
   * The current mode of the page.
   */
  export let state: EventState;

  /**
   * The currently selected pills
   */
  export let selection: PickerPill[] = [];

  /**
   * title of the card.
   */
  export let title: string;
</script>

<Card class="w-full h-full overflow-hidden">
  <div class="flex justify-between">
    <CardHeading>{title}</CardHeading>
    {#if $mode === 'edit'}
      <button type="button" on:click={() => (state = state === 'add' ? 'info' : 'add')}>
        {#if state === 'add'}
          <Icon icon="mdi:close-circle-outline" class="text-2xl text-red" />
        {:else}
          <Icon icon="mdi:plus-circle-outline" class="text-2xl text-sky" />
        {/if}
      </button>
    {/if}
  </div>
  <div class="overflow-auto">
    <slot />
  </div>
  {#if state === 'add'}
    <div class="flex flex-col gap-4 p-2 border rounded-md border-text">
      <slot name="addition">
        <h3>Those elements will be added:</h3>
        <PillCollection pills={selection}></PillCollection>
      </slot>
    </div>
  {/if}
</Card>
