<script lang="ts">
  import { routes } from '../routes';
  import SideMenuEntry from '$lib/components/menus/sidemenu/SideMenuEntry.svelte';

  const childRoutes = routes.find(({ href }) => href === '/statistics')?.children ?? [];
</script>

{#each childRoutes as childRoute}
  <SideMenuEntry {...childRoute} isMenuOpen={true}></SideMenuEntry>
{/each}
