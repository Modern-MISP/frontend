<script lang="ts">
  import Pill from '../pill/Pill.svelte';

  /**
   * The label of the pill. Will be placed on the left side of the pill. The background of the label is bg-crust.
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
   * The link of the pill => the page where to navigate of pill is clicked.
   */
  export let href: string;
</script>

<!-- 
  @component
  A pill component that also acts as a link. This pills text will be blue:

 -->

<a {href}>
  <Pill {label} {text} {icon} class="!text-blue-400" />
</a>
