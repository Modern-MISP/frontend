<script lang="ts">
  import Icon from '@iconify/svelte';

  export let isOpen = false;

  export let routes: { name: string; icon: string; href: string }[] = [];

  export let activeRoute: string | null = null;
</script>

<div class="relative flex flex-col items-center h-full gap-6 p-6 rounded-xl bg-mantle text-text">
  <slot name="logo">
    <div class="w-10 h-10 rounded-full bg-text" />
  </slot>
  <hr class="w-full border-text" />
  <slot>
    {#each routes as { href, icon, name }}
      <a
        {href}
        class="text-2xl rounded-full cursor-pointer hover:text-sky"
        class:text-sky={activeRoute && activeRoute.includes(href)}
      >
        <Icon {icon} />
      </a>
    {/each}
  </slot>

  <hr class="w-full mt-auto border-text" />
  <button
    on:click={() => (isOpen = true)}
    class="text-2xl rounded-full cursor-pointer hover:text-sky"
  >
    <Icon icon="mdi:chevron-right" />
  </button>
</div>
