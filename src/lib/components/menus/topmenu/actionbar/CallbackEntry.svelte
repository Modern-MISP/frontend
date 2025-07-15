<script lang="ts">
  import ActionBarEntry from './ActionBarEntry.svelte';

  interface Props {
    /**
     * The label of this ActionBar entry.
     */
    label: string;
    /**
     * The icon of this ActionBar entry.
     */
    icon: string;
    /** Callback function that is executed on click. */
    action: () => void;
    /** When true, the action cannot be clicked. */
    disabled?: boolean;
    class?: string;
  }

  let { label, icon, action, disabled = false, class: clazz = '' }: Props = $props();
  /**
   * The class of this ActionBar entry.
   */
</script>

<!--
  @component
  An {@link ActionBarEntry} with an `on:click` callback action associated with it.
-->

<button type="button" onclick={action} {disabled}>
  <ActionBarEntry {icon} {label} {disabled} class={clazz} />
</button>
