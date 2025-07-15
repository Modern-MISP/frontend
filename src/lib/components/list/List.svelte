<script lang="ts">
  import CardHeading from '../card/CardHeading.svelte';

  interface Props {
    /**
     * List of items to display.
     */
    items: string[];
    /**
     * Function to determine the class of an element based on its value.
     * @returns the classed that will be applied
     */
    elemClass?: (item: string) => string;
    /**
     * Title of the list.
     */
    title: string;
    /**
     * Override the list body class
     */
    bodyClass?: string;
    moreHeader?: import('svelte').Snippet;
    children?: import('svelte').Snippet<[any]>;
  }

  let {
    items,
    elemClass = () => '',
    title,
    bodyClass = '',
    moreHeader,
    children
  }: Props = $props();
</script>

<!--
  @component
  Displays a list of items with a title.
  You can add classes to an element by passing a function to `elemClass`.
 -->

<div>
  <div class="flex justify-between">
    <CardHeading class="sticky top-0 z-20 px-2 py-6 text-2xl font-bold bg-ctp-surface0"
      >{title}</CardHeading
    >
    {@render moreHeader?.()}
  </div>
  <div class="pl-6 {bodyClass}">
    <ol class="list-decimal">
      {#each items as item, index}
        {#if children}{@render children({ item, index })}{:else}
          <li class="list-disc {elemClass(item)}">
            {item}
          </li>
        {/if}
      {/each}
    </ol>
  </div>
</div>
