<script>
  import Card from '../card/Card.svelte';
  import CardHeading from '../card/CardHeading.svelte';
</script>

<Card class="!bg-surface0 shadow-lg border-2 border-overlay0">
  <CardHeading><slot name="heading" /></CardHeading>
  <slot />
</Card>
