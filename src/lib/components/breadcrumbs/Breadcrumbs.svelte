<script lang="ts">
  import type { Route } from '$lib/models/Route.interface';
  import Icon from '@iconify/svelte';

  /**
   * The route that will be displayed in the breadcrumbs.
   */
  export let routes: Route[] = [];
</script>

<!-- 
  @component
  Displays a [breadcrumb trail](https://en.wikipedia.org/wiki/Breadcrumb_navigation) with the given routes.
 -->

<div class="flex items-center text-lg font-medium text-text">
  {#each routes as { href, icon, name }, i}
    <a {href} class="flex items-center gap-2 rounded-full cursor-pointer hover:text-sky">
      <Icon {icon} />
      {name}
    </a>
    {#if routes.length - 1 != i}
      <Icon icon="mdi:chevron-right" class="w-8 h-8 text-sky " />
    {/if}
  {/each}
</div>
