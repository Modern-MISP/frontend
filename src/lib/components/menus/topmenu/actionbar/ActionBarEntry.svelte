<script lang="ts">
  import Icon from '@iconify/svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type ActionBar from './ActionBar.svelte';
  import ActionBarEntryTemplate from './ActionBarEntryTemplate.svelte';

  /**
   * The label of this ActionBar entry.
   */
  export let label: string;

  /**
   * The icon of this ActionBar entry.
   */
  export let icon: string;

  let clazz = '';

  /**
   * The class of this ActionBar entry.
   */
  export { clazz as class };
</script>

<!--
  @component
  Represents one of the entries of the {@link ActionBar}.
  
-->

<ActionBarEntryTemplate class={clazz}>
  <Icon {icon} class="w-6 h-6" />
  <span slot="label">{label}</span>
</ActionBarEntryTemplate>
