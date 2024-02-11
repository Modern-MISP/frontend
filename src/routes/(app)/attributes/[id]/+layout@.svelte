<script lang="ts">
  import { page } from '$app/stores';
  import Layout from '$lib/components/layout/Layout.svelte';
  import { currentRoute } from '$lib/stores';
  import { routes as mainRoutes } from '../../routes';

  /**
   * Add all routes that are included in the current url.
   */
  $: $currentRoute = [
    {
      name: 'Attributes',
      icon: 'mdi:flag',
      href: '/attributes'
    },
    {
      name: $page.params.id,
      icon: 'mdi:id-card',
      href: `/attributes/${$page.params.id}`
    }
  ];
</script>

<Layout routes={mainRoutes} currentRoute={$currentRoute}>
  <slot />
</Layout>
