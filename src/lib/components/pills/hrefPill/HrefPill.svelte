<script lang="ts">
  import type { HTMLAttributeAnchorTarget } from 'svelte/elements';
  import Pill from '../pill/Pill.svelte';

  /**
   * The label of the pill. Will be placed on the left side of the pill. The background of the label is `bg-crust`.
   */
  export let label: string | undefined = undefined;
  /**
   * The text of the pill. Will be placed in the middle of the pill.
   */
  export let text = '';
  /**
   * The icon of the pill. Will be placed on the left side of the pill. If a label is present, the icon will be placed on the left side of the label.
   */
  export let icon: string | undefined = undefined;
  /**
   * The target URL of the pill, which will be navigated to when the pill is clicked.
   */
  export let href: string;
  /**
   * The target browsing context i.e. where to open the URL.
   */
  export let target: HTMLAttributeAnchorTarget | undefined = undefined;

  /**
   * Some style overrides.
   */
  export let style = '';

  /**
   * Whether to force the text to be blue.
   */
  export let enforceTextColor = true;
</script>

<!-- 
  @component
  A pill component that acts as a link. This pill's text will be blue:

 -->

<a {href} {target}>
  <Pill {label} {text} {icon} {style} class={enforceTextColor ? '!text-blue-400' : ''} />
</a>
