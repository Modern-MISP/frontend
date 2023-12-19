<script lang="ts">
  import Icon from '@iconify/svelte';
  import { fade } from 'svelte/transition';
  import SideMenuDivider from './SideMenuDivider.svelte';
  import SideMenuEntry from './SideMenuEntry.svelte';
  import { FADE_OPTIONS } from './config';

  export let isOpen = false;

  export let routes: Route[] = [];

  export let activeRoute: string | null = null;
</script>

<aside
  class="fixed z-20 flex flex-col w-0 h-full gap-4 p-2 py-6 overflow-hidden duration-200 ease-in lg:relative lg:!flex lg:w-20 rounded-xl bg-mantle text-text shrink-0"
  class:!w-80={isOpen}
  class:hidden={!isOpen}
>
  <slot name="logo">
    <div class="flex h-10 gap-12 px-5 overflow-hidden text-2xl" class:text-4xl={isOpen}>
      <Icon icon="mdi:home" class="text-inherit shrink-0" />
      {#if isOpen}
        <h1 class="font-bold line-clamp-1" transition:fade={FADE_OPTIONS}>MISP</h1>
      {/if}
    </div>
  </slot>

  <SideMenuDivider />
  <nav class="flex flex-col justify-center w-full gap-2">
    <slot>
      {#each routes as route}
        <div class="flex flex-col px-5 rounded-2xl" class:bg-crust={isOpen}>
          <SideMenuEntry
            {...route}
            isMenuOpen={isOpen}
            active={activeRoute?.includes(route.href)}
          />
        </div>
      {/each}
    </slot>
  </nav>
  <SideMenuDivider class="mt-auto" />
  <div class="relative flex items-center w-full px-4">
    {#if isOpen}
      <span class="absolute text-sky left-10 line-clamp-1" transition:fade={FADE_OPTIONS}
        >Version: 0.0.1</span
      >
    {/if}
    <button
      class="ml-auto text-4xl transition-all duration-500 cursor-pointer hover:text-sky"
      on:click={() => (isOpen = !isOpen)}
      class:rotate-180={isOpen}
    >
      <Icon icon="mdi:chevron-right" />
    </button>
  </div>
</aside>
