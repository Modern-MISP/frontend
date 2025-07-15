<script lang="ts">
  import { run } from 'svelte/legacy';

  import { page } from '$app/state';
  import { contextRoutes } from '$lib/actions';
  import { currentRoute } from '$lib/stores.svelte.ts';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  const eventContextRoutes = [
    {
      name: 'Event Info',
      icon: 'mdi:information-outline',
      href: `/events/${page.params.id}/#`
    },
    {
      name: 'Event Galaxies',
      icon: 'streamline:galaxy-2-solid',
      href: `/events/${page.params.id}/galaxies`
    },
    {
      name: 'Event Attributes',
      icon: 'mdi:flag',
      href: `/events/${page.params.id}/attributes`
    },
    {
      name: 'Event Graph',
      icon: 'ph:graph',
      href: `/events/${page.params.id}/graph`
    }
  ];

  run(() => {
    $currentRoute = [
      {
        name: 'Events',
        icon: 'mdi-calendar',
        href: '/events'
      },
      {
        name: page.params.id,
        icon: 'mdi:id-card',
        href: `/events/${page.params.id}`
      },
      ...eventContextRoutes.filter(({ href }) => page.url.href.includes(href))
    ];
  });
</script>

<svelte:window use:contextRoutes={eventContextRoutes} />

{@render children?.()}
