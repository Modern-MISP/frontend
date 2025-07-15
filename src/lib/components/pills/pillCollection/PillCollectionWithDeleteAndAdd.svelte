<script lang="ts" generics="T">
  import { run } from 'svelte/legacy';

  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { appState } from '$lib/stores.svelte.ts';
  import Icon from '@iconify/svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{
    delete: PickerPill<T>[];
    save: PickerPill<T>[];
    open: void;
    close: void;
  }>();

  interface Props {
    /**
     * The current mode of the page.
     */
    add?: boolean;
    /**
     * The currently selected pills
     */
    selection?: PickerPill<T>[];
    /**
     * Pills that are currently marked for deletion
     */
    deletion?: PickerPill<T>[];
    children?: import('svelte').Snippet;
    footer?: import('svelte').Snippet;
    s_deletion?: import('svelte').Snippet;
    addition?: import('svelte').Snippet;
  }

  let {
    add = $bindable(false),
    selection = $bindable([]),
    deletion = $bindable([]),
    children,
    footer,
    s_deletion,
    addition
  }: Props = $props();
  const _onDelete = () => {
    dispatch('delete', deletion);
    deletion = [];
  };
  const _onSave = () => {
    dispatch('save', selection);
    selection = [];
  };
  run(() => {
    add ? dispatch('open') : dispatch('close');
  });
</script>

{#if appState.mode === 'edit'}
  <button type="button" class="absolute top-6 right-4" onclick={() => (add = !add)}>
    {#if add}
      <Icon icon="mdi:close-circle-outline" class="text-2xl text-ctp-red" />
    {:else}
      <Icon icon="mdi:plus-circle-outline" class="text-2xl text-ctp-sky" />
    {/if}
  </button>
{/if}
<div class="relative flex flex-col h-full gap-2 overflow-hidden">
  <div class="h-full overflow-auto">
    {@render children?.()}
  </div>

  <div class="relative w-full rounded-md bg-ctp-surface0 h-fit">
    {#if footer}{@render footer()}{:else}
      {#if s_deletion}{@render s_deletion()}{:else if deletion.length > 0 && appState.mode === 'edit'}
        <div class="relative flex flex-col gap-4 p-2 mt-4 border rounded-md border-text">
          <h3>Those elements will be deleted:</h3>
          <PillCollection pills={deletion}></PillCollection>

          <button
            onclick={_onDelete}
            class="absolute p-2 text-2xl text-white rounded-md bg-ctp-red right-2 bottom-2"
            type="button"
          >
            <Icon icon="mdi:delete-outline"></Icon>
          </button>
        </div>
      {/if}
      {#if add && appState.mode === 'edit'}
        {#if addition}{@render addition()}{:else}
          <div class="relative flex flex-col gap-4 p-2 mt-4 border rounded-md border-text">
            <h3>Those elements will be added:</h3>
            <PillCollection pills={selection}></PillCollection>
            <button
              onclick={_onSave}
              class="absolute p-2 text-2xl text-white rounded-md bg-ctp-green right-2 bottom-2"
              type="button"
            >
              <Icon icon="material-symbols:save-outline"></Icon>
            </button>
          </div>
        {/if}
      {/if}
    {/if}
  </div>
</div>
