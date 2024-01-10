<script lang="ts">
  import Icon from '@iconify/svelte';

  /**
   * The label of the column
   */
  export let label: string;
  /**
   * The icon of the column
   */
  export let icon: string;

  let clazz = '';
  /**
   * The class to be applied to the table head.
   */
  export { clazz as class };
</script>

<!-- 
  @component
  
  @slot - The content of the th.
  @prop label - The label of the column

  
  
 -->

<th class="sticky top-0 bg-surface1 {clazz}" on:click>
  <div class="flex items-center gap-2 p-6 text-xl">
    <Icon {icon} />
    <span>
      {label}
    </span>
  </div>
</th>
