<script lang="ts">
  import Card from '$lib/components/card/Card.svelte';
  import CardHeading from '$lib/components/card/CardHeading.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { mode } from '$lib/stores';
  import Icon from '@iconify/svelte';
  import type { EventState } from './EventState.interface';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ delete: PickerPill[] }>();

  /**
   * The current mode of the page.
   */
  export let state: EventState;

  /**
   * The currently selected pills
   */
  export let selection: PickerPill[] = [];

  /**
   * Pills that are currently marked for deletion
   */
  export let deletion: PickerPill[] = [];
  /**
   * title of the card.
   */
  export let title: string;

  const _onDelete = () => {
    dispatch('delete', deletion);
    deletion = [];
  };
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
  <slot name="footer">
    <slot name="deletion">
      {#if deletion.length > 0}
        <div class="relative flex flex-col gap-4 p-2 border rounded-md border-text">
          <h3>Those elements will be deleted:</h3>
          <PillCollection pills={deletion}></PillCollection>

          <button
            type="button"
            on:click={_onDelete}
            class="absolute p-2 text-2xl text-white rounded-md bg-red right-2 bottom-2"
          >
            <Icon icon="mdi:delete-outline"></Icon>
          </button>
        </div>
      {/if}
    </slot>
  </slot>
  {#if state === 'add'}
    <slot name="addition">
      <div class="flex flex-col gap-4 p-2 border rounded-md border-text">
        <h3>Those elements will be added:</h3>
        <PillCollection pills={selection}></PillCollection>
      </div>
    </slot>
  {/if}
</Card>
