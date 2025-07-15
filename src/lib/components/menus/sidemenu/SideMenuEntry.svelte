<script lang="ts">
  import SideMenuEntry from './SideMenuEntry.svelte';
  import type { Route } from '$lib/models/Route.interface';
  import Icon from '@iconify/svelte';
  import { fade } from 'svelte/transition';
  import { FADE_OPTIONS } from './config';
  import { createTooltip, melt } from '@melt-ui/svelte';

  interface Props {
    /**
     * The name to be displayed in this side menu entry.
     */
    name: string;
    /**
     * The icon to be displayed in this side menu entry.
     */
    icon: string;
    /**
     * The href to be used in this side menu entry.
     *
     * This is the URL of the page this entry links to.
     */
    href: string;
    /**
     * Whether this side menu entry is active or not.
     *
     * Active entries are highlighted visually.
     */
    active?: boolean;
    /**
     * Whether the parent side menu is open or not.
     */
    isMenuOpen?: boolean;
    /**
     * The children of this side menu entry.
     *
     * Will be displayed as subentries.
     */
    children?: Route[] | undefined;
    /**
     * Whether this side menu entry is a child of another {@link SideMenuEntry}, meaning it is a subentry.
     */
    isChild?: boolean;
  }

  let {
    name,
    icon,
    href,
    active = false,
    isMenuOpen = false,
    children = $bindable(undefined),
    isChild = false
  }: Props = $props();
  isChild;

  function filterChildren() {
    return children?.every(({ hidden }) => hidden) ? undefined : children?.filter((x) => !x.hidden);
  }
  let visibleChildren = $derived(filterChildren());

  let isOpen = $state(false);

  // Close submenus on main menu close
  $effect(() => {
    if (!isMenuOpen) isOpen = false;
  });

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
  class="flex items-center justify-between text-lg transition-all duration-200 cursor-pointer hover:text-ctp-sky"
  class:text-ctp-sky={active}
  title={name}
>
  <a class="flex items-center w-full h-16 gap-4 p-4" title={name} {href}>
    <div class="flex items-center justify-center h-full aspect-square" use:melt={$trigger}>
      <Icon {icon} class="mx-auto shrink-0" />
    </div>
    {#if isMenuOpen}
      <span class="w-full font-medium line-clamp-1" transition:fade={FADE_OPTIONS}>
        {name}
      </span>
    {/if}
  </a>
  {#if visibleChildren}
    {#if isMenuOpen}
      <button
        type="button"
        class="p-4 text-2xl transition-all duration-500 rounded-full cursor-pointer hover:text-ctp-sky"
        class:rotate-180={isOpen}
        onclick={() => (isMenuOpen ? (isOpen = !isOpen) : null)}
      >
        <Icon icon="mdi:chevron-down" />
      </button>
    {:else}
      <div
        use:melt={$content}
        class="z-10 px-4 rounded-md shadow bg-ctp-surface0 text-ctp-text shadow-black"
      >
        {#each visibleChildren as child}
          <SideMenuEntry {...child} isMenuOpen={true} isChild={true}></SideMenuEntry>
        {/each}
      </div>
    {/if}
  {/if}
</div>
{#if visibleChildren && isOpen}
  {#each visibleChildren as child}
    <SideMenuEntry {...child} {isMenuOpen} isChild={true} />
  {/each}
{/if}
