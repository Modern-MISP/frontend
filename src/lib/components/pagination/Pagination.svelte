<script lang="ts" generics="T">
  import Icon from '@iconify/svelte';
  import { debounce, range } from 'lodash-es';
  import Input from '$lib/components/input/Input.svelte';

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

  let userInputPageComponent;
  let userInputPage;
  let firstPage;
  let lastPage;
  $: {
    userInputPage = page;
    firstPage = Math.max(page - 3, 1);
    lastPage = Math.min(page + 3, length);
  }
  $: length = Math.ceil(length);

  const updatePage = debounce((userInput) => {
    userInput = parseInt(userInput);
    if (userInput >= 1 && userInput <= length) {
      page = userInput;
      userInputPage = userInput;
    }
    userInputPageComponent?.setValue(page);
  }, 500);
  $: {
    updatePage(userInputPage);
  }
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
    <button type="button" class="text-lg hover:text-ctp-sky" on:click={() => (page = 1)}>{1} </button>
    <button type="button" on:click={() => (page > 1 ? page-- : undefined)} class="w-6 h-6 shrink-0">
      <Icon icon="mdi:chevron-left" class="w-auto h-full hover:text-ctp-sky" />
    </button>
    <div
      class="flex w-full gap-4 overflow-auto text-ellipsis"
      class:gap-8={length < BIG_GAPS_BEFORE}
    >
      <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
      {#each range(firstPage, lastPage + 1) as num}
        {#if page == num}
          <Input
            bind:this={userInputPageComponent}
            type="number"
            value={page}
            on:value={({ detail }) => (userInputPage = detail)}
          />
        {:else}
          <button
            type="button"
            class="text-lg hover:text-ctp-sky"
            class:text-ctp-sky={page == num}
            on:click={() => (page = num)}>{num}</button
          >
        {/if}
      {/each}
    </div>
    <button
      type="button"
      on:click={() => (page < length ? page++ : undefined)}
      class="w-6 h-6 shrink-0"
    >
      <Icon icon="mdi:chevron-right" class="w-auto h-full hover:text-ctp-sky" />
    </button>
    <button type="button" class="text-lg hover:text-ctp-sky" on:click={() => (page = length)}
      >{length}
    </button>
  </div>
{/if}
