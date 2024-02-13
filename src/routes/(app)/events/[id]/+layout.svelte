<script>
  import { page } from '$app/stores';
  import { contextRoutes } from '$lib/actions';
</script>

<svelte:window
  use:contextRoutes={[
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
  ]}
/>

<slot />
