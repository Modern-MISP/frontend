<script lang="ts">
  import { POST } from '$lib/api';
  import Pagination from '$lib/components/pagination/Pagination.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { PageData } from './$types';
  /**
   * Page data
   */
  export let data: PageData;

  let { tableData, header } = data;

  // TODO: move to generic util function. Smth. link (url, page)
  const loadMore = async (page: number) => {
    const {
      data: _data,
      error: mispError,
      response
    } = await POST('/events/index', { body: { page, limit: 50 } });

    if (mispError) {
      console.error(mispError);
      alert('Error fetching more data');
    }

    if (response.ok && _data) {
      tableData = _data;
    }

    throw new Error('Error fetching more data');
  };

  $: page = 1;
  $: loadMore(page);
</script>

<!--
  @component
  Displays a list of all events.
  
-->

<DynTable href={({ id }) => `/events/${id}`} {header} data={tableData} />

<Pagination bind:page />
