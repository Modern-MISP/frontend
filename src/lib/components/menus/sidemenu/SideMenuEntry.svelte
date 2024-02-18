<script lang="ts">
  import Icon from '@iconify/svelte';
  import { fade } from 'svelte/transition';
  import { FADE_OPTIONS } from './config';
  import SideMenuDivider from './SideMenuDivider.svelte';
  import type { Route } from '$lib/models/Route.interface';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type SideMenuEntry from './SideMenuEntry.svelte';
  import { createTooltip, melt } from '@melt-ui/svelte';

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
  isChild;

  let isOpen = false;

  // Close submenus on main menu close
  $: if (!isMenuOpen) isOpen = false;

  const {
    elements: { content, trigger }
  } = createTooltip({
    positioning: {
      placement: 'right'
    },
    openDelay: 0,
    closeDelay: 0,
    portal: '#layout'
  });
</script>

<!-- 
  @component
  The side menu entry component.
  
  It can be opened by clicking on it when the parent side menu is open.

  When open, all the children will be displayed as subentries using this component.
 -->

<div
  class="flex items-center justify-between h-16 gap-8 text-lg transition-all duration-200 cursor-pointer hover:text-sky"
  class:text-sky={active}
  title={name}
  use:melt={$trigger}
>
  <a class="flex items-center gap-4" title={name} {href}>
    <Icon {icon} class="mx-auto shrink-0" />
    {#if isMenuOpen}
      <span class="font-medium line-clamp-1" transition:fade={FADE_OPTIONS}>
        {name}
      </span>
    {/if}
  </a>
  {#if children}
    {#if isMenuOpen}
      <button
        type="button"
        class="text-2xl transition-all duration-500 rounded-full cursor-pointer hover:text-sky"
        class:rotate-180={isOpen}
        on:click={() => (isMenuOpen ? (isOpen = !isOpen) : null)}
      >
        <Icon icon="mdi:chevron-down" />
      </button>
    {:else}
      <div
        use:melt={$content}
        class="z-10 px-4 rounded-md shadow bg-surface0 text-text shadow-black"
      >
        {#each children as child}
          <svelte:self {...child} isMenuOpen={true} isChild={true}></svelte:self>
        {/each}
      </div>
    {/if}
  {/if}
</div>
{#if children && isOpen}
  <SideMenuDivider class="w-full" />
  {#each children as child}
    <svelte:self {...child} {isMenuOpen} isChild={true} />
  {/each}
{/if}
