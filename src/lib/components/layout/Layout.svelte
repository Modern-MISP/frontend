<script lang="ts">
  import SideMenu from '$lib/components/menus/sidemenu/SideMenu.svelte';
  import TopMenu from '$lib/components/menus/topmenu/TopMenu.svelte';
  import type { Route } from '$lib/models/Route.interface';
  import { mode } from '$lib/stores';
  import Breadcrumbs from '../breadcrumbs/Breadcrumbs.svelte';
  import type { SideMenuRoute } from '../menus/sidemenu/SideMenu.model';
  /**
   * The routes to be displayed in the side menu.
   */
  export let routes: SideMenuRoute[];

  /**
   * The current route to be displayed in the {@link Breadcrumbs}.
   */
  export let currentRoute: Route[] = [];

  let isOpen = false;
</script>

<!-- 
  @component
  The basic component for the layout of the application. It contains the {@link SideMenu}, {@link TopMenu} and {@link Breadcrumbs} components.
  The body goes inside of the default slot. 
  You can also override the {@link SideMenu} by using the "sideMenu" slot.
 -->

<div class="fixed w-[100vw] h-full flex flex-row bg-base text-text p-2">
  <slot name="sideMenu">
    <SideMenu {routes} bind:isOpen />
  </slot>

  <div class="flex flex-col h-full min-w-0 grow">
    <div class="ml-0 lg:ml-4">
      <TopMenu bind:mode={$mode} bind:isOpen />
    </div>

    <div class="relative flex flex-col h-full gap-6 mt-6 overflow-hidden lg:m-8">
      <Breadcrumbs routes={currentRoute} />
      <main class="relative flex max-h-full overflow-hidden grow">
        <slot />
      </main>
    </div>
  </div>
</div>
