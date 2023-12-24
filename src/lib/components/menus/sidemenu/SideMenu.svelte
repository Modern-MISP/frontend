<script lang="ts">
  import Icon from '@iconify/svelte';
  import { fade } from 'svelte/transition';
  import SideMenuDivider from './SideMenuDivider.svelte';
  import SideMenuEntry from './SideMenuEntry.svelte';
  import { FADE_OPTIONS } from './config';
  import type { SideMenuRoute } from './SideMenu.model';

  /**
   * The current state of the side menu. It is exportable to be able to change it from other components.
   */
  export let isOpen = false;

  /**
   * The routes to be displayed in the side menu.
   */
  export let routes: SideMenuRoute[] = [];

  /**
   * The current route that is active. Should probably always be the current url ($page.url.href).
   */
  export let activeRoute: string | null = null;
</script>

<!-- 
  @component
  The side menu component. It contains the {@link SideMenuEntry} and {@link SideMenuDivider} components.
  You can override the default SideMenuEntry list display by using the default slot.
  You can also override the logo by using the "logo" slot.
  If you do that do not forget the set fade options otherwise it may look weird.
 -->
<aside
  class="relative z-20 flex flex-col h-full gap-4 p-2 py-6 overflow-hidden duration-200 ease-in lg:relative lg:!flex lg:w-20 rounded-xl bg-mantle text-text shrink-0 w-full"
  class:lg:w-80={isOpen}
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
  <nav class="flex flex-col justify-center w-full gap-2 overflow-auto">
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
