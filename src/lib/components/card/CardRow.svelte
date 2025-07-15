<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type Card from './Card.svelte';
  interface Props {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { class: clazz = '', children }: Props = $props();
  /**
   * Additional classes to be applied to this component.
   */
</script>

<!--
  @component
  This component should be used to display rows inside of a {@link Card}.

  It's recommended to only use up to two children in the slot, which will be displayed at both ends of the row.

 -->
<div class="flex justify-between items-center text-lg {clazz}">
  {@render children?.()}
</div>
