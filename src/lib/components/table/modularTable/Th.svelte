<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import Icon from '@iconify/svelte';

  interface Props {
    /**
     * The label of the column.
     */
    label: string;
    /**
     * The icon of the column.
     */
    icon: string;
    class?: string;
  }

  let { label, icon, class: clazz = '' }: Props = $props();
  /**
   * The class to be applied to the table head.
   */
</script>

<!--
  @component
  Creates an HTML [`th`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th) element for the table with specific styling.

  @slot - The content of the th.

 -->

<th class="sticky top-0 bg-ctp-surface1 z-20 {clazz}" onclick={bubble('click')}>
  <div class="flex items-center gap-2 px-4 py-2 text-xl">
    <Icon {icon} class="shrink-0" />
    <span>
      {label}
    </span>
  </div>
</th>
