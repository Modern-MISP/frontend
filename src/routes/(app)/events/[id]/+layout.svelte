<script lang="ts">
  import { page } from '$app/stores';
  import { contextRoutes } from '$lib/actions';
  import { currentRoute } from '$lib/stores';

  const eventContextRoutes = [
    {
      name: 'Event Info',
      icon: 'mdi:information-outline',
      href: `/events/${$page.params.id}/#`
    },
    {
      name: 'Event Attributes',
      icon: 'mdi:flag',
      href: `/events/${$page.params.id}/attributes`
    },
    {
      name: 'Event Galaxies',
      icon: 'streamline:galaxy-2-solid',
      href: `/events/${$page.params.id}/galaxies`
    },
    {
      name: 'Event Graph',
      icon: 'ph:graph',
      href: `/events/${$page.params.id}/graph`
    }
  ];

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
    ...eventContextRoutes.filter(({ href }) => $page.url.href.includes(href))
  ];
</script>

<svelte:window use:contextRoutes={eventContextRoutes} />

<slot />
