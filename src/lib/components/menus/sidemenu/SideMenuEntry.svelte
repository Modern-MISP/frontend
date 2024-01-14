<script lang="ts">
  import Icon from '@iconify/svelte';
  import { fade } from 'svelte/transition';
  import { FADE_OPTIONS } from './config';
  import SideMenuDivider from './SideMenuDivider.svelte';
  import type { Route } from '$lib/models/Route.interface';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type SideMenuEntry from './SideMenuEntry.svelte';

  /**
   * The name to be displayed in this side menu entry.
   */
  export let name: string;
  /**
   * The icon to be displayed in this side menu entry.
   */
  export let icon: string;
  /**
   * The href to be used in this side menu entry.
   *
   * This is the URL of the page this entry links to.
   */
  export let href: string;
  /**
   * Whether this side menu entry is active or not.
   *
   * Active entries are highlighted visually.
   */
  export let active = false;

  /**
   * Whether the parent side menu is open or not.
   */
  export let isMenuOpen = false;

  /**
   * The children of this side menu entry.
   *
   * Will be displayed as subentries.
   */
  export let children: Route[] | undefined = undefined;
  $: children = children?.every(({ hidden }) => hidden)
    ? undefined
    : children?.filter((x) => !x.hidden);

  /**
   * Whether this side menu entry is a child of another {@link SideMenuEntry}, meaning it is a subentry.
   */
  export let isChild = false;

  let isOpen = false;

  // Close submenus on main menu close
  $: if (!isMenuOpen) isOpen = false;
</script>

<!-- 
  @component
  The side menu entry component.
  
  It can be opened by clicking on it when the parent side menu is open.

  When open, all the children will be displayed as subentries using this component.
 -->

<a
  href={children && !isChild && isMenuOpen ? null : href}
  class="flex items-center justify-between h-16 gap-8 text-lg transition-all duration-200 cursor-pointer hover:text-sky"
  class:text-sky={active}
  on:click={() => (isMenuOpen ? (isOpen = !isOpen) : null)}
  title={name}
>
  <div class="flex items-center gap-4" title={name}>
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
