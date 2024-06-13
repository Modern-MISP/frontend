<script lang="ts">
  import { routes } from '../routes';
  import SideMenuEntry from '$lib/components/menus/sidemenu/SideMenuEntry.svelte';
  import { actionBar } from '$lib/actions';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';

  const childRoutes = routes.find(({ href }) => href === '/settings')?.children ?? [];

  const topMenuActions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:download',
      label: 'Export',
      action: () => {
        console.log('YAY');
      }
    }
  ];
</script>

<svelte:window use:actionBar={topMenuActions} />

<!-- 
    @component
    Displays the settings page with all subpages.
-->	
{#each childRoutes as childRoute}
  <SideMenuEntry {...childRoute} isMenuOpen={true}></SideMenuEntry>
{/each}
