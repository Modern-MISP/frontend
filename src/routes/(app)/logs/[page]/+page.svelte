<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import Icon from '@iconify/svelte';
  import Button from '$lib/components/button/Button.svelte';

  export let data;

  console.log(data.tableData);

  function open_href(foward: boolean) {
    return () => {
      const a = document.createElement('a');
      if (foward) {
        a.href = `/logs/${data.page + 1}`;
      } else {
        a.href = `/logs/${data.page - 1}`;
      }
      a.click();
    };
  }
</script>

<!--
  @component

  A list of all Logs that MISP creates. Contains following information about the logs:
  - ID
  - IP
  - E-Mail
  - Organisation
  - Created (timestamp)
  - Model
  - Model-ID
  - Action
  - Title
  - Change

-->

<ComplexTableLayout {...data} tableHref={(x) => `/logs/view/${x.id}`}></ComplexTableLayout>
<div class="flex items-center max-w-full gap-2 mx-auto w-fit">
  {#if data.page > 1}
    <Button type="button" on:click={open_href(false)} class="w-6 h-16 shrink-0">
      <Icon icon="mdi:chevron-left" class="w-auto h-full hover:text-sky" />
      Previous Page
    </Button>
  {/if}
  {#if data.tableData.length > 0}
    <Button type="button" on:click={open_href(true)} class="w-6 h-16 shrink-0">
      Next Page
      <Icon icon="mdi:chevron-right" class="w-auto h-full hover:text-sky" />
    </Button>
  {/if}
</div>
