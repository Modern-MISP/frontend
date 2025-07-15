<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import Card from '$lib/components/card/Card.svelte';
  import Icon from '@iconify/svelte';

  /**
   * Additional classes to be applied to this component.
   */

  interface Props {
    class?: string;
    /**
     * The icon to be displayed in this card.
     */
    icon: string;
    /**
     * The text to be displayed in this card.
     */
    text: string;
    /**
     * The target URL of the Card, which will be navigated to when the Card is clicked.
     */
    href?: string;
  }

  let { class: clazz = '', icon, text, href = '' }: Props = $props();
</script>

<!--
  @component
  A card with a slot for content (Icon and Text).
  Sets the default padding and border radius. You can override this by passing your own classes.

 -->
<button onclick={bubble('click')} type="button">
  <a {href}>
    <Card
      class="p-3 overflow-hidden items-center cursor-pointer hover:text-ctp-sky {clazz}"
      title={text}
    >
      <Icon {icon} />
      {text}
    </Card>
  </a>
</button>
