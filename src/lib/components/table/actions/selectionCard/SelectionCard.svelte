<script lang="ts">
  import DynActionCard from '../dynCard/DynActionCard.svelte';

  /** Number of rows that are currently selected. */
  export let numSelected: number;
  /** Callback for selecting all rows. */
  export let selectAll: () => void;
  /** Callback for unselecting all rows. */
  export let unselectAll: () => void;

  $: header = [
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
  ];
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
