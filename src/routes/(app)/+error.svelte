<script lang="ts">
  import { page } from '$app/stores';
  import Card from '$lib/components/card/Card.svelte';
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
