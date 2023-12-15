<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import SideMenu from './SideMenu.svelte';
  import { themes } from '$lib/stores';
  export let Hst: Hst;

  let theme = 'macchiato';

  let routes = [
    {
      name: 'Events',
      icon: 'mdi-calendar',
      href: 'event'
    },
    {
      name: 'Galaxies',
      icon: 'streamline:galaxy-2-solid',
      href: 'galaxy'
    },
    {
      name: 'Workflows',
      icon: 'material-symbols:network-node',
      href: 'workflows'
    },
    {
      name: 'Admin',
      icon: 'mdi-shield-account',
      href: 'admin'
    },
    {
      name: 'Settings',
      icon: 'mdi-cog',
      href: 'settings'
    }
  ];
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>

  <div class="{theme} w-28">
    <SideMenu {routes} />
  </div>
</Hst.Story>
