<script>
  import Card from '../card/Card.svelte';
</script>

<Card class="!bg-surface2">
  <header>
    <h1 class="text-lg font-bold"><slot name="heading" /></h1>
    <hr />
  </header>

  <slot />
</Card>
