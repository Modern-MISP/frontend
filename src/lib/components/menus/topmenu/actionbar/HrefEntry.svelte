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
    /** URL for hyperlink */
    action?: string | undefined;
    /** When true, the action cannot be clicked. */
    disabled?: boolean;
    class?: string;
  }

  let { label, icon, action = undefined, disabled = false, class: clazz = '' }: Props = $props();
  /**
   * The class of this ActionBar entry.
   */
</script>

<!--
  @component
  An {@link ActionBarEntry} that acts as a link to the specified URL.
-->

<a href={action} class:pointer-events-none={disabled}>
  <ActionBarEntry {label} {icon} {disabled} class={clazz} />
</a>
