<script lang="ts">
  import { actionBarEntries, contextInfo, lockModeToggle, appState } from '$lib/stores.svelte.ts';
  import Icon from '@iconify/svelte';
  import ActionBar from './actionbar/ActionBar.svelte';
  import ToggleModeEntry from './actionbar/ToggleModeEntry.svelte';
  import ContextInfo from './contextInfo/ContextInfo.svelte';
  import UserInfo from './UserInfo.svelte';

  interface Props {
    /**
     * Whether the side menu is open or not.
     */
    isOpen?: boolean;
    /**
     * Data about the current user.
     */
    userData: { email: string; admin: boolean };
    children?: import('svelte').Snippet;
  }

  let { isOpen = $bindable(false), userData, children }: Props = $props();
</script>

<!--
  @component
  The top menu component.

  The search bar and the {@link ActionBar} are located here.

 -->

<div
  class="flex flex-row items-center justify-between gap-4 p-2 rounded-xl bg-ctp-mantle text-ctp-text"
>
  <div class="flex items-center gap-4">
    <button type="button" onclick={() => (isOpen = !isOpen)} class="lg:hidden">
      {#if isOpen}
        <Icon icon="mdi:close-circle-outline" class="text-4xl shrink-0" />
      {:else}
        <Icon icon="mdi:menu" class="text-4xl shrink-0" />
      {/if}
    </button>
    {@render children?.()}
    <!-- <Input placeholder="search">
      <Icon icon="mdi:magnify" slot="icon" class="w-10 h-10" />
    </Input> -->
  </div>
  <div class="flex items-center gap-6">
    <div
      class="flex flex-row items-center justify-between gap-4 p-3 text-ctp-text rounded-xl bg-ctp-crust"
    >
      {#if appState.mode === 'edit'}
        <ActionBar entries={$actionBarEntries} />
      {/if}
      <ToggleModeEntry disabled={$lockModeToggle} />
    </div>

    <div class="flex flex-row items-center justify-between gap-4 p-3 text-ctp-text rounded-xl">
      <ContextInfo info={$contextInfo} />
    </div>

    <div class="flex flex-row items-center justify-between gap-4 p-4 text-ctp-text rounded-xl">
      <UserInfo {userData}></UserInfo>
    </div>

    <!-- <div class="flex flex-col items-center gap-1">
      <div class="text-2xl rounded-full">
        <Icon icon="mdi:account-circle" />
      </div>
      <span class="text-xs">admin@admin.test</span>
    </div> -->
  </div>
</div>
