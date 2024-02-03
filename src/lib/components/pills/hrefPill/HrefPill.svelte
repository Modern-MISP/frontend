<script lang="ts">
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
</script>

<!-- 
  @component
  A pill component that acts as a link. This pill's text will be blue:

 -->

<a {href}>
  <Pill {label} {text} {icon} class="!text-blue-400" />
</a>
