<script lang="ts">
  import EnableFilter from './EnableFilter.svelte';

  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  interface Props {
    /**
     * Page data of the galaxy table.
     */
    data: any;
  }

  let { data }: Props = $props();

  let { tableData } = $derived(data);

  let filtered: typeof tableData = $state([]);
</script>

<!--
  @component

  A list of all galaxies.
-->

<ComplexTableLayout {...data}>
  {#snippet filter()}
    <div>
      <EnableFilter bind:data={tableData} bind:filtered></EnableFilter>
    </div>
  {/snippet}
</ComplexTableLayout>
