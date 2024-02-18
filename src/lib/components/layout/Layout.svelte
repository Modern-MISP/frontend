<script lang="ts">
  import Notifications from './Notifications.svelte';

  import SideMenu from '$lib/components/menus/sidemenu/SideMenu.svelte';
  import TopMenu from '$lib/components/menus/topmenu/TopMenu.svelte';
  import type { Route } from '$lib/models/Route.interface';
  import { mode, settings } from '$lib/stores';
  import Breadcrumbs from '../breadcrumbs/Breadcrumbs.svelte';
  import type { SideMenuRoute } from '../menus/sidemenu/SideMenu.model';
  import { page } from '$app/stores';
  /**
   * The routes to be displayed in the side menu.
   */
  export let routes: SideMenuRoute[];

  /**
   * Context dependant routes to be displayed in a separate side menu section.
   */
  export let contextRoutes: SideMenuRoute[] = [];

  /**
   * The current route to be displayed in the {@link Breadcrumbs}.
   */
  export let currentRoute: Route[] = [];

  /**
   * Data about the current user
   */
  export let userData: { email: string; admin: boolean };

  let isOpen = $settings.openOnInit;
</script>

<!-- 
  @component
  The basic component for the layout of the application.

  This Component is intended to be used in [Layouts](layouts.md#layouts),
  where the page body will automatically be inserted into the default slot.

  You can also override the {@link SideMenu} by using the `sideMenu` slot.
 -->

<div class="fixed w-[100vw] h-full flex flex-row bg-base text-text p-2">
  <slot name="sideMenu">
    <SideMenu {routes} {contextRoutes} activeRoute={$page.url.pathname} bind:isOpen />
  </slot>

  <div class="flex flex-col h-full min-w-0 grow">
    <div class="ml-0 lg:ml-4">
      <TopMenu bind:mode={$mode} bind:isOpen {userData}>
        <div class="pl-4">
          <Breadcrumbs routes={currentRoute} />
        </div>
      </TopMenu>
    </div>

    <div class="relative flex flex-col h-full gap-6 mt-6 overflow-hidden lg:m-8">
      <Notifications />
      <main class="relative flex flex-col max-h-full gap-4 overflow-hidden grow">
        <slot />
      </main>
    </div>
  </div>
</div>
