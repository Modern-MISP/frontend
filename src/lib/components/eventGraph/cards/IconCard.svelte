<script lang="ts">
  import Card from '$lib/components/card/Card.svelte';
  import Icon from '@iconify/svelte';

  let clazz = '';
  /**
   * Additional classes to be applied to this component.
   */
  export { clazz as class };

  /**
   * The icon to be displayed in this card.
   */
  export let icon: string;

  /**
   * The text to be displayed in this card.
   */
  export let text: string;
  /**
   * The target URL of the Card, which will be navigated to when the Card is clicked.
   */
  export let href = '';
</script>

<!-- 
  @component
  A card with a slot for content (Icon and Text).
  Sets the default padding and border radius. You can override this by passing your own classes.
  
 -->
<button on:click type="button">
  <a {href}>
    <Card
      class="p-3 overflow-hidden items-center cursor-pointer hover:text-sky {clazz}"
      title={text}
    >
      <Icon {icon} />
      {text}
    </Card>
  </a>
</button>
