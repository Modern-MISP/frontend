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
      href: '/workflows',
      children: [
        {
          name: 'Admin',
          icon: 'mdi-shield-account',
          href: '/admin'
        },
        {
          name: 'Settings',
          icon: 'mdi-cog',
          href: '/settings'
        }
      ]
    },
    {
      name: 'Admin',
      icon: 'mdi-shield-account',
      href: '/admin',
      children: [
        {
          name: 'Admin',
          icon: 'mdi-shield-account',
          href: '/admin'
        },
        {
          name: 'Settings',
          icon: 'mdi-cog',
          href: '/settings'
        }
      ]
    },
    {
      name: 'Settings',
      icon: 'mdi-cog',
      href: '/settings'
    }
  ];
</script>

<div class="absolute w-[100vw] h-full flex flex-row bg-base text-text p-2 {$settings.theme}">
  <slot name="sideMenu">
    <SideMenu {routes} activeRoute={$page.url.toString()} />
  </slot>

  <div class="flex flex-col h-full min-w-0 grow">
    <TopMenu bind:mode={$mode} />

    <main class="relative flex flex-col h-full gap-6 m-8 overflow-hidden">
      <PillNavigation routes={$currentRoute} action={$currentAction} />
      <slot />
    </main>
  </div>
</div>
