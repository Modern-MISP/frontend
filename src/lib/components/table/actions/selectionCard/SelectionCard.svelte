<script lang="ts">
  import DynActionCard from '../dynCard/DynActionCard.svelte';

  interface Props {
    /** Number of rows that are currently selected. */
    numSelected: number;
    /** Callback for selecting all rows. */
    selectAll: () => void;
    /** Callback for unselecting all rows. */
    unselectAll: () => void;
  }

  let { numSelected, selectAll, unselectAll }: Props = $props();

  let header = $derived([
    numSelected === 0
      ? {
          label: 'select all',
          icon: 'mdi:checkbox-outline',
          action: selectAll
        }
      : {
          label: 'unselect all',
          icon: 'material-symbols:check-box-outline-blank',
          action: unselectAll
        }
  ]);
</script>

<!--
  @component

  Display number of selected rows alongside actions for
  selecting/unselecting all rows.
-->

<DynActionCard {header} data={[]}>
  <div class="text-center">
    {numSelected} selected
  </div>
</DynActionCard>
