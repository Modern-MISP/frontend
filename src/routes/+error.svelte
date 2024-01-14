<script>
  import { page } from '$app/stores';
  import { currentRoute } from '$lib/stores';

  $currentRoute = [
    {
      name: 'Error',
      icon: 'mdi:alert-circle-outline',
      href: '/error'
    }
  ];
</script>

<!-- 
  @component

  If any error occurs inside of a +page.ts [load function](https://kit.svelte.dev/docs/load), this page will be rendered. Handles 403 errors, by showing a link to the login page.

  See: https://kit.svelte.dev/docs/errors
  
 -->

<div class="flex flex-col items-center justify-center w-full h-full gap-6 p-5 text-center text-red">
  <h2 class="text-9xl">
    {$page.status}
  </h2>
  <h1 class="text-4xl font-bold">An error occurred!</h1>
  <p class="text-xl">
    {$page.error?.message}
  </p>

  {#if $page.status === 403}
    <span>
      Goto
      <a href="/login" class="underline text-sky">login</a>
    </span>
  {/if}
</div>
