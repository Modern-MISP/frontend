<script lang="ts">
  import Icon from '@iconify/svelte';
  import { fade } from 'svelte/transition';
  import { FADE_OPTIONS } from './config';
  import SideMenuDivider from './SideMenuDivider.svelte';

  export let name: string;
  export let icon: string;
  export let href: string;
  export let active = false;
  export let isMenuOpen = false;
  export let children: Route[] | undefined = undefined;

  export let isChild = false;

  let isOpen = false;

  // Close submenues on main menu close
  $: if (!isMenuOpen) isOpen = false;
</script>

<a
  href={children && !isChild && isMenuOpen ? null : href}
  class="flex items-center justify-between h-16 gap-8 text-2xl transition-all duration-200 cursor-pointer hover:text-sky"
  class:text-sky={active}
  on:click={() => (isMenuOpen ? (isOpen = !isOpen) : null)}
>
  <div class="flex items-center gap-4">
    <Icon {icon} class="mx-auto shrink-0" />
    {#if isMenuOpen}
      <span class="font-medium line-clamp-1" transition:fade={FADE_OPTIONS}>
        {name}
      </span>
    {/if}
  </div>
  {#if isMenuOpen && children}
    <button
      class="text-2xl transition-all duration-500 rounded-full cursor-pointer hover:text-sky"
      class:rotate-180={isOpen}
    >
      <Icon icon="mdi:chevron-down" />
    </button>
  {/if}
</a>
{#if children && isOpen}
  <SideMenuDivider class="w-full" />
  {#each children as child}
    <svelte:self {...child} {isMenuOpen} isChild={true} />
  {/each}
{/if}
