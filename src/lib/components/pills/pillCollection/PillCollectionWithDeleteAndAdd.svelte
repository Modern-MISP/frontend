<script lang="ts" generics="T">
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { mode } from '$lib/stores';
  import Icon from '@iconify/svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{
    delete: PickerPill<T>[];
    save: PickerPill<T>[];
    open: void;
    close: void;
  }>();

  /**
   * The current mode of the page.
   */
  export let add = false;

  $: add ? dispatch('open') : dispatch('close');

  /**
   * The currently selected pills
   */
  export let selection: PickerPill<T>[] = [];

  /**
   * Pills that are currently marked for deletion
   */
  export let deletion: PickerPill<T>[] = [];
  const _onDelete = () => {
    dispatch('delete', deletion);
    deletion = [];
  };
  const _onSave = () => {
    dispatch('save', selection);
    selection = [];
  };
</script>

<div class="relative flex flex-col gap-2">
  {#if $mode === 'edit'}
    <button type="button" class="absolute top-0 right-0" on:click={() => (add = !add)}>
      {#if add}
        <Icon icon="mdi:close-circle-outline" class="text-2xl text-red" />
      {:else}
        <Icon icon="mdi:plus-circle-outline" class="text-2xl text-sky" />
      {/if}
    </button>
  {/if}
  <div class="overflow-auto">
    <slot />
  </div>
  <slot name="footer">
    <slot name="deletion">
      {#if deletion.length > 0}
        <div class="relative flex flex-col gap-4 p-2 mt-8 border rounded-md border-text">
          <h3>Those elements will be deleted:</h3>
          <PillCollection pills={deletion}></PillCollection>

          <button
            on:click={_onDelete}
            class="absolute p-2 text-2xl text-white rounded-md bg-red right-2 bottom-2"
            type="button"
          >
            <Icon icon="mdi:delete-outline"></Icon>
          </button>
        </div>
      {/if}
    </slot>
  </slot>
  {#if add}
    <slot name="addition">
      <div class="relative flex flex-col gap-4 p-2 mt-8 border rounded-md border-text">
        <h3>Those elements will be added:</h3>
        <PillCollection pills={selection}></PillCollection>
        <button
          on:click={_onSave}
          class="absolute p-2 text-2xl text-white rounded-md bg-green right-2 bottom-2"
          type="button"
        >
          <Icon icon="material-symbols:save-outline"></Icon>
        </button>
      </div>
    </slot>
  {/if}
</div>
