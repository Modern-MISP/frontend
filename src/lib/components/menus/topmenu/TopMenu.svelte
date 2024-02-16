<script lang="ts">
  import type { Mode } from '$lib/models/Mode';
  import { actionBarEntries, contextInfo, lockModeToggle } from '$lib/stores';
  import Icon from '@iconify/svelte';
  import ActionBar from './actionbar/ActionBar.svelte';
  import ToggleModeEntry from './actionbar/ToggleModeEntry.svelte';
  import ContextInfo from './contextInfo/ContextInfo.svelte';

  /**
   * The mode of the current page. Possible modes are currently "view" and "edit": TODO: maybe extract this to a store?
   */
  export let mode: Mode = 'view';

  /**
   * Whether the side menu is open or not. TODO: probably should search for a better solution for this.
   */
  export let isOpen = false;
</script>

<!-- 
  @component
  The top menu component.

  The search bar and the {@link ActionBar} are located here.
  
 -->

<div class="flex flex-row items-center justify-between gap-4 p-4 rounded-xl bg-mantle text-text">
  <div class="flex items-center gap-4">
    <button on:click={() => (isOpen = !isOpen)} class="lg:hidden">
      {#if isOpen}
        <Icon icon="mdi:close-circle-outline" class="text-4xl shrink-0" />
      {:else}
        <Icon icon="mdi:menu" class="text-4xl shrink-0" />
      {/if}
    </button>
    <slot />
    <!-- <Input placeholder="search">
      <Icon icon="mdi:magnify" slot="icon" class="w-10 h-10" />
    </Input> -->
  </div>
  <div class="flex items-center gap-6">
    <div class="flex flex-row items-center justify-between gap-4 p-4 text-text rounded-xl bg-crust">
      {#if mode === 'edit'}
        <ActionBar entries={$actionBarEntries} />
      {/if}
      <ToggleModeEntry bind:mode disabled={$lockModeToggle} />
    </div>

    <div class="flex flex-row items-center justify-between gap-4 p-4 text-text rounded-xl">
      <ContextInfo info={$contextInfo} />
    </div>

    <!-- <div class="flex flex-col items-center gap-1">
      <div class="text-2xl rounded-full">
        <Icon icon="mdi:account-circle" />
      </div>
      <span class="text-xs">admin@admin.test</span>
    </div> -->
  </div>
</div>
