<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Card from '$lib/components/card/Card.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { currentRoute } from '$lib/stores';

  if ($page.status !== 404)
    goto('/error', {
      replaceState: true,
      state: {
        status: $page.status,
        message: $page.error?.message ?? ''
      }
    });

  $currentRoute = [
    ...($currentRoute?.slice(0, -1) ?? []),
    {
      name: 'Error',
      icon: 'mdi:alert-circle-outline',
      href: '/error'
    }
  ];
</script>

<!--
  @component
  
  404 error page for app routes.
  Other errors will be redirected to '/error' to use the root layout.

  See: https://kit.svelte.dev/docs/errors
-->
<Card class="!resize-none">
  <div
    class="flex flex-col items-center justify-center w-full h-full gap-6 p-5 text-center text-red"
  >
    <h1 class="text-5xl font-bold">Error 404</h1>
    <p class="text-xl">{$page.error?.message ?? ''}</p>
  </div>
</Card>
