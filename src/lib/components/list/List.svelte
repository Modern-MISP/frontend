<script lang="ts">
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
</script>

<!-- 
  @component
  Displays a list of items with a title.
  You can add classes to an element by passing a function to `elemClass`.
 -->

<div>
  <h1 class="sticky top-0 px-2 py-6 text-2xl font-bold bg-surface0">{title}</h1>
  <div class="pl-6">
    <ol class="list-decimal">
      {#each items as item}
        <li class="list-disc {elemClass(item)}">
          {item}
        </li>
      {/each}
    </ol>
  </div>
</div>
