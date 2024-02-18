<script lang="ts">
  import CardHeading from '../card/CardHeading.svelte';

  /**
   * List of items to display.
   */
  export let items: string[];

  /**
   * Function to determine the class of an element based on its value.
   * @returns the classed that will be applied
   */
  export let elemClass: (item: string) => string = () => '';

  /**
   * Title of the list.
   */
  export let title: string;

  /**
   * Override the list body class
   */
  export let bodyClass = '';
</script>

<!-- 
  @component
  Displays a list of items with a title.
  You can add classes to an element by passing a function to `elemClass`.
 -->

<div>
  <div class="flex justify-between">
    <CardHeading class="sticky top-0 z-20 px-2 py-6 text-2xl font-bold bg-surface0"
      >{title}</CardHeading
    >
    <slot name="moreHeader" />
  </div>
  <div class="pl-6 {bodyClass}">
    <ol class="list-decimal">
      {#each items as item, index}
        <slot {item} {index}>
          <li class="list-disc {elemClass(item)}">
            {item}
          </li>
        </slot>
      {/each}
    </ol>
  </div>
</div>
