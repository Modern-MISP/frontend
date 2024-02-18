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

  /**
   * Is this entry active. You should bind to this
   */
  export let active = false;
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

<button type="button" on:click={() => (active = !active)} class:text-sky={active} on:click>
  <ActionBarEntry {icon} {label} class={clazz} />
</button>
