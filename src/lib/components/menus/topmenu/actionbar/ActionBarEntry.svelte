<script lang="ts">
  import Icon from '@iconify/svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type ActionBar from './ActionBar.svelte';
  import ActionBarEntryTemplate from './ActionBarEntryTemplate.svelte';

  interface Props {
    /**
     * The label of this ActionBar entry.
     */
    label: string;
    /**
     * The icon of this ActionBar entry.
     */
    icon: string;
    /** When true, the action cannot be clicked. */
    disabled?: boolean;
    class?: string;
  }

  let { label, icon, disabled = false, class: clazz = '' }: Props = $props();

  /**
   * The class of this ActionBar entry.
   */
</script>

<!--
  @component
  Represents one of the entries of the {@link ActionBar}.

-->

<ActionBarEntryTemplate {disabled} class={clazz}>
  <Icon {icon} class="w-6 h-6" />
  {#snippet label()}
    <span>{label}</span>
  {/snippet}
</ActionBarEntryTemplate>
