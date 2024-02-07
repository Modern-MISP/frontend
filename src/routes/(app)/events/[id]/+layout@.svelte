<script lang="ts">
  import { page } from '$app/stores';
  import Layout from '$lib/components/layout/Layout.svelte';
  import type { SideMenuRoute } from '$lib/components/menus/sidemenu/SideMenu.model';
  import { currentRoute } from '$lib/stores';
  import { routes as mainRoutes } from '../../routes';

  const contextRoutes: SideMenuRoute[] = [
    {
      name: 'Event Info',
      icon: 'mdi:information-outline',
      href: `/events/${$page.params.id}/#`
    },
    {
      name: 'Event Galaxies',
      icon: 'streamline:galaxy-2-solid',
      href: `/events/${$page.params.id}/galaxies`
    },
    {
      name: 'Event Attributes',
      icon: 'mdi:flag',
      href: `/events/${$page.params.id}/attributes`
    },
    {
      name: 'Event Graph',
      icon: 'ph:graph',
      href: `/events/${$page.params.id}/graph`
    }
  ];

  /**
   * Add all routes that are included in the current url.
   */
  $: $currentRoute = [
    {
      name: 'Events',
      icon: 'mdi-calendar',
      href: '/events'
    },
    {
      name: $page.params.id,
      icon: 'mdi:id-card',
      href: `/events/${$page.params.id}`
    },
    ...contextRoutes
      .flatMap((x) => [x, ...(x.children || [])])
      .filter(({ href }) => $page.url.href.includes(href))
  ];
</script>

<Layout {contextRoutes} routes={mainRoutes} currentRoute={$currentRoute}>
  <slot />
</Layout>
