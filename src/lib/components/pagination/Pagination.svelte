<script lang="ts" generics="T">
  import Icon from '@iconify/svelte';

  // Max pages before the gap decreases.
  const BIG_GAPS_BEFORE = 50;

  /**
   * The current page.
   */
  export let page: number = 1;

  /**
   * The total number of pages.
   */
  export let length: number;

  $: length = Math.ceil(length);
</script>

<!-- 
  @component
  A pagination component that allows the user to navigate through pages  of a list.
 -->

{#if length > 1}
  <div
    class="flex items-center max-w-full gap-2 mx-auto w-fit"
    class:gap-8={length < BIG_GAPS_BEFORE}
  >
    <button on:click={() => (page > 1 ? page-- : undefined)} class="w-6 h-6 shrink-0">
      <Icon icon="mdi:chevron-left" class="w-auto h-full hover:text-sky" />
    </button>
    <div
      class="flex w-full gap-4 overflow-auto text-ellipsis"
      class:gap-8={length < BIG_GAPS_BEFORE}
    >
      <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
      {#each { length } as _, i}
        <button
          class="text-lg hover:text-sky"
          class:text-sky={page == i + 1}
          on:click={() => (page = i + 1)}>{i + 1}</button
        >
      {/each}
    </div>
    <button on:click={() => (page < length ? page++ : undefined)} class="w-6 h-6 shrink-0">
      <Icon icon="mdi:chevron-right" class="w-auto h-full hover:text-sky" />
    </button>
  </div>
{/if}
