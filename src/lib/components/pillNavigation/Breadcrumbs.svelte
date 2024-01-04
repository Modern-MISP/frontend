<script lang="ts">
  import type { Route } from '$lib/models/Route.interface';
  import Icon from '@iconify/svelte';

  /**
   * The route that will be displayed in the pill navigation.
   */
  export let routes: Route[] = [];
</script>

<div class="flex items-center text-lg font-medium text-text">
  {#each routes as { href, icon, name }}
    <a {href} class="flex items-center gap-2 rounded-full cursor-pointer hover:text-sky">
      <Icon {icon} />
      {name}
    </a>

    <Icon icon="mdi:chevron-right" class="w-8 h-8 text-sky " />
  {/each}
</div>
