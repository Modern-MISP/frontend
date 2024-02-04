<script lang="ts">
  import CallbackEntry from '$lib/components/menus/topmenu/actionbar/CallbackEntry.svelte';
  import ActionCard from '../card/ActionCard.svelte';

  /** Number of rows that are currently selected. */
  export let numSelected: number;
  /** Callback for selecting all rows. */
  export let selectAll: () => void;
  /** Callback for unselecting all rows. */
  export let unselectAll: () => void;
</script>

<!--
  @component
  
  Display number of selected rows alongside actions for
  selecting/unselecting all rows.
-->
<ActionCard class="gap-4">
  <div class="text-center">
    {numSelected} selected
  </div>
  {#if numSelected === 0}
    <CallbackEntry
      icon="material-symbols:check-box-outline"
      label="select all"
      action={selectAll}
    />
  {:else}
    <CallbackEntry
      icon="material-symbols:check-box-outline-blank"
      label="unselect all"
      action={unselectAll}
    />
  {/if}
</ActionCard>
