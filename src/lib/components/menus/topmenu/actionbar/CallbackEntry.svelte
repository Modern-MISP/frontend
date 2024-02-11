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

  /** When true, the action cannot be clicked. */
  export let disabled: boolean = false;

  let clazz = '';
  /**
   * The class of this ActionBar entry.
   */
  export { clazz as class };
</script>

<!--
  @component
  An {@link ActionBarEntry} with an `on:click` callback action associated with it.
-->

<button on:click={action} {disabled}>
  <ActionBarEntry {icon} {label} {disabled} class={clazz} />
</button>
