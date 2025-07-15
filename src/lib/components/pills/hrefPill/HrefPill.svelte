<script lang="ts">
  import type { HTMLAttributeAnchorTarget } from 'svelte/elements';
  import Pill from '../pill/Pill.svelte';
  import type { ComponentProps } from 'svelte';

  interface Props {
    /**
     * The label of the pill. Will be placed on the left side of the pill. The background of the label is `bg-ctp-crust`.
     */
    label?: string | undefined;
    /**
     * The text of the pill. Will be placed in the middle of the pill.
     */
    text?: string;
    /**
     * The icon of the pill. Will be placed on the left side of the pill. If a label is present, the icon will be placed on the left side of the label.
     */
    icon?: string | undefined;
    /**
     * The target URL of the pill, which will be navigated to when the pill is clicked.
     */
    href: string;
    /**
     * The target browsing context i.e. where to open the URL.
     */
    target?: HTMLAttributeAnchorTarget | undefined;
    /**
     * Some style overrides.
     */
    style?: string;
    /**
     * Whether to force the text to be blue.
     */
    enforceTextColor?: boolean;
    /**
     * Action of this pill
     */
    action?: ComponentProps<Pill>['action'];
  }

  let {
    label = undefined,
    text = '',
    icon = undefined,
    href,
    target = undefined,
    style = '',
    enforceTextColor = true,
    action = undefined
  }: Props = $props();
</script>

<!--
  @component
  A pill component that acts as a link. This pill's text will be blue:

 -->

<Pill {label} {text} {icon} {action} {style} class={enforceTextColor ? 'text-ctp-blue-400!' : ''}>
  <a {href} {target}>{text}</a>
</Pill>
