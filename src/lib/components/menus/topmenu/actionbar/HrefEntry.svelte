<script lang="ts">
  import FastActionsEntry from './ActionBarEntry.svelte';

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
</script>

<a href={action}>
  <FastActionsEntry {label} {icon} />
</a>
