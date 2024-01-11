<script lang="ts">
  import Icon from '@iconify/svelte';

  /**
   * The current page
   */
  export let page: number;

  /**
   * The total number of pages
   */
  export let length: number = 25;
</script>

<div class="grid w-full max-w-6xl grid-flow-col gap-2 mx-auto">
  <button on:click={() => (page > 1 ? page-- : undefined)} class="h-full">
    <Icon icon="mdi:chevron-left" class="w-auto h-full hover:text-sky" />
  </button>
  <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
  {#each { length } as _, i}
    <button
      class="text-lg hover:text-sky"
      class:text-sky={page == i + 1}
      on:click={() => (page = i + 1)}>{i + 1}</button
    >
  {/each}
  <button on:click={() => (page < 25 ? page++ : undefined)} class="h-full">
    <Icon icon="mdi:chevron-right" class="w-auto h-full hover:text-sky" />
  </button>
</div>
