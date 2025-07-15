<script lang="ts">
  import Card from '$lib/components/card/Card.svelte';
  import CardHeading from '$lib/components/card/CardHeading.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { appState } from '$lib/stores.svelte.ts';
  import Icon from '@iconify/svelte';
  import type { EventState } from './EventState.interface';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ delete: PickerPill[] }>();

  interface Props {
    /**
     * The current mode of the page.
     */
    state: EventState;
    /**
     * The currently selected pills
     */
    selection?: PickerPill[];
    /**
     * Pills that are currently marked for deletion
     */
    deletion?: PickerPill[];
    /**
     * title of the card.
     */
    title: string;
    children?: import('svelte').Snippet;
    footer?: import('svelte').Snippet;
    s_deletion?: import('svelte').Snippet;
    addition?: import('svelte').Snippet;
  }

  let {
    state = $bindable(),
    selection = [],
    deletion = $bindable([]),
    title,
    children,
    footer,
    s_deletion,
    addition
  }: Props = $props();

  const _onDelete = () => {
    dispatch('delete', deletion);
    deletion = [];
  };
</script>

<Card class="w-full h-full overflow-hidden">
  <div class="flex justify-between">
    <CardHeading>{title}</CardHeading>
    {#if appState.mode === 'edit'}
      <button type="button" onclick={() => (state = state === 'add' ? 'info' : 'add')}>
        {#if state === 'add'}
          <Icon icon="mdi:close-circle-outline" class="text-2xl text-ctp-red" />
        {:else}
          <Icon icon="mdi:plus-circle-outline" class="text-2xl text-ctp-sky" />
        {/if}
      </button>
    {/if}
  </div>
  <div class="overflow-auto">
    {@render children?.()}
  </div>
  {#if footer}{@render footer()}{:else if s_deletion}{@render s_deletion()}{:else if deletion.length > 0}
    <div class="relative flex flex-col gap-4 p-2 border rounded-md border-text">
      <h3>Those elements will be deleted:</h3>
      <PillCollection pills={deletion}></PillCollection>

      <button
        type="button"
        onclick={_onDelete}
        class="absolute p-2 text-2xl text-white rounded-md bg-ctp-red right-2 bottom-2"
      >
        <Icon icon="mdi:delete-outline"></Icon>
      </button>
    </div>
  {/if}
  {#if state === 'add'}
    {#if addition}{@render addition()}{:else}
      <div class="flex flex-col gap-4 p-2 border rounded-md border-text">
        <h3>Those elements will be added:</h3>
        <PillCollection pills={selection}></PillCollection>
      </div>
    {/if}
  {/if}
</Card>
