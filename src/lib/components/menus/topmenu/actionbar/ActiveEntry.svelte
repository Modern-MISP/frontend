<script lang="ts">
  import { createBubbler, handlers } from 'svelte/legacy';

  const bubble = createBubbler();
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
    /**
     * Is this entry active. You should bind to this
     */
    active?: boolean;
    class?: string;
  }

  let { label, icon, active = $bindable(false), class: clazz = '' }: Props = $props();
  /**
   * The class of this ActionBar entry.
   */
</script>

<!--
  @component
  An {@link ActionBarEntry} with an `on:click` callback action associated with it.
-->

<button
  type="button"
  onclick={handlers(() => (active = !active), bubble('click'))}
  class:text-ctp-sky={active}
>
  <ActionBarEntry {icon} {label} class={clazz} />
</button>
