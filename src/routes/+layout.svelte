<script lang="ts">
  import TopMenu from '$lib/components/menus/topmenu/TopMenu.svelte';
  import SideMenu from '$lib/components/menus/sidemenu/SideMenu.svelte';
  import PillNavigation from '$lib/components/pillNavigation/PillNavigation.svelte';
  import { currentAction, currentRoute, mode, settings } from '$lib/stores';
  import { page } from '$app/stores';
  export let routes = [
    {
      name: 'Events',
      icon: 'mdi-calendar',
      href: '/event'
    },
    {
      name: 'Galaxies',
      icon: 'streamline:galaxy-2-solid',
      href: '/galaxy'
    },
    {
      name: 'Workflows',
      icon: 'material-symbols:network-node',
      href: '/workflows'
    },
    {
      name: 'Admin',
      icon: 'mdi-shield-account',
      href: '/admin',
      children: [
        {
          name: 'Users',
          icon: 'mdi:account',
          href: '/users'
        },
        {
          name: 'Keys',
          icon: 'mdi:key',
          href: '/keys'
        },

        {
          name: 'Remote Server',
          icon: 'mdi:server',
          href: '/servers'
        }
      ]
    },
    {
      name: 'Settings',
      icon: 'mdi-cog',
      href: '/settings'
    }
  ];
  let isOpen = false;
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
