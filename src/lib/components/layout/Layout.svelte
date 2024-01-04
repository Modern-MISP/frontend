<script lang="ts">
  import SideMenu from '$lib/components/menus/sidemenu/SideMenu.svelte';
  import TopMenu from '$lib/components/menus/topmenu/TopMenu.svelte';
  import type { Route } from '$lib/models/Route.interface';
  import { settings } from '$lib/stores';
  import type { SideMenuRoute } from '../menus/sidemenu/SideMenu.model';
  import Breadcrumbs from '../pillNavigation/Breadcrumbs.svelte';
  /**
   * The routes to be displayed in the side menu.
   */
  export let routes: SideMenuRoute[];

  /**
   * The current route to be displayed in the {@link Breadcrumbs}.
   */
  export let currentRoute: Route[] = [];
</script>

<!-- 
  @component
  The basic component for the layout of the application. It contains the {@link SideMenu}, {@link TopMenu} and {@link PillNavigation} components.
  The body goes inside of the default slot. 
  You can also override the {@link SideMenu} by using the "sideMenu" slot.
 -->

<div class="absolute w-[100vw] h-full flex flex-row bg-base text-text {$settings.theme}">
  <slot name="sideMenu">
    <SideMenu {routes} />
  </slot>

  <div class="flex flex-col h-full min-w-0 grow">
    <TopMenu />

    <main class="relative h-full m-8 overflow-auto">
      <Breadcrumbs routes={currentRoute} />
      <br />
      <slot />
    </main>
  </div>
</div>
