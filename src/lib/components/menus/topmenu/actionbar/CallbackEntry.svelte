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

  /** Callback function that is executed on click. */
  export let action: () => void;
</script>

<!--
  @component
  An {@link ActionBarEntry} with an `on:click` callback action associated with it.
-->

<button on:click={action}>
  <ActionBarEntry {icon} {label} />
</button>
