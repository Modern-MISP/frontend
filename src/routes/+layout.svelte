<script lang="ts">
  import TopMenu from '$lib/components/menus/topmenu/TopMenu.svelte';
  import SideMenu from '$lib/components/menus/sidemenu/SideMenu.svelte';
  import PillNavigation from '$lib/components/pillNavigation/PillNavigation.svelte';
  import { currentAction, currentRoute, mode, settings } from '$lib/stores';
  import { page } from '$app/stores';
  import { routes } from './routes';

  let isOpen = $settings.openOnInit;

  const idEntry = (name: string) => ({
    name,
    icon: 'mdi:id-card',
    href: '../list'
  });

  $: $currentAction = $page.url.href.split('/').pop() as any; // TODO:: write typeguard with fallback. If filter are available via "?"" parameters you should change this.

  /**
   * Add all routes from {@link "./routes.ts"} that are included in the current url. If the route has a id parameter also include the id
   */
  $: $currentRoute = [
    ...routes
      .flatMap((x) => [x, ...(x.children || [])])
      .filter(({ href }) => $page.url.href.includes(href)),
    ...($page.params.id ? [idEntry($page.params.id)] : [])
  ];
</script>

<div class="fixed w-[100vw] h-full flex flex-row bg-base text-text {$settings.theme} p-2">
  <slot name="sideMenu">
    <SideMenu {routes} activeRoute={$page.url.toString()} bind:isOpen />
  </slot>

  <div class="flex flex-col h-full min-w-0 grow">
    <div class="ml-0 lg:ml-4">
      <TopMenu bind:mode={$mode} bind:isOpen />
    </div>

    <main class="relative flex flex-col h-full gap-6 mt-6 overflow-hidden lg:m-8">
      <PillNavigation routes={$currentRoute} action={$currentAction} />
      <slot />
    </main>
  </div>
</div>
