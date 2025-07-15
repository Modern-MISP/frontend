<script lang="ts">
  import Card from '../card/Card.svelte';
  import CardHeading from '../card/CardHeading.svelte';
  interface Props {
    heading?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  }

  let { heading, children }: Props = $props();
</script>

<Card class="bg-ctp-surface0! shadow-lg border-2 border-overlay0">
  <CardHeading>{@render heading?.()}</CardHeading>
  {@render children?.()}
</Card>
