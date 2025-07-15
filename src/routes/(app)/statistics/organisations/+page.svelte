<script lang="ts">
  import LocalFilter from './LocalFilter.svelte';

  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  interface Props {
    /**
     * Page data of the organisations table.
     */
    data: any;
  }

  let { data }: Props = $props();

  let { tableData } = $derived(data);

  let filtered: typeof tableData = $state([]);
</script>

<!--
  @component

  A list of all the organisations available to the user.
-->

<ComplexTableLayout {...data}>
  {#snippet filter()}
    <div>
      <LocalFilter bind:data={tableData} bind:filtered></LocalFilter>
    </div>
  {/snippet}
</ComplexTableLayout>
