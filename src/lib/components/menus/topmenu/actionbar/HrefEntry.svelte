<script lang="ts">
  import ActionBarEntry from './ActionBarEntry.svelte';

  /**
   * The label of this ActionBar entry.
   */
  export let label: string;

  /**
   * The icon of this ActionBar entry.
   */
  export let icon: string;

  /** URL for hyperlink */
  export let action: string | undefined = undefined;

  let clazz = '';
  /**
   * The class of this ActionBar entry.
   */
  export { clazz as class };
</script>

<!--
  @component
  An {@link ActionBarEntry} that acts as a link to the specified URL.
-->

<a href={action}>
  <ActionBarEntry {label} {icon} class={clazz} />
</a>
