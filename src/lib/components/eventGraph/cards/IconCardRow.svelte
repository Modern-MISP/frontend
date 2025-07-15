<script lang="ts">
  import CardRow from '$lib/components/card/CardRow.svelte';

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
  A row of icon cards
  Sets the default padding and border radius. You can override this by passing your own classes.

 -->
<CardRow class="rounded-lg bg-ctp-surface0 {clazz}">
  {@render children?.()}
</CardRow>
