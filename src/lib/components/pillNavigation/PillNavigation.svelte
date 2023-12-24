<script lang="ts">
  import type { Route } from '$lib/models/Route.interface';
  import Icon from '@iconify/svelte';

  /**
   * The route that will be displayed in the pill navigation.
   */
  export let routes: Route[] = [];

  /**
   * The action that will be displayed in the pill navigation.
   */
  export let action: string;
</script>

<div class="flex items-center text-lg font-medium text-text">
  {#each routes as { href, icon, name }}
    <a {href} class="flex items-center gap-2 rounded-full cursor-pointer hover:text-sky">
      <Icon {icon} />
      {name}
    </a>

    <Icon icon="mdi:chevron-right" class="w-8 h-8 text-sky " />
  {/each}

  <span class="text-sky" class:text-red={action === 'error'}>
    {action.slice(0, 1).toUpperCase() + action.slice(1)}
  </span>
</div>
