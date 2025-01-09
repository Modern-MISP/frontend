<script lang="ts">
  import { api } from '$lib/api';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import { get } from 'svelte/store';
  export let data;
  let tableData = data.data.map((x) => x.Log);
  console.log(data);
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
<ComplexTableLayout
  {...data}
  {tableData}
  dataAccess={(x) => x.map((y) => y.Log)}
  tableHref={(x) => `/logs/view/${x.id}`}
  endpoint={(bodyOptions) => get(api).POST('/logs/index', { body: { limit: 50, ...bodyOptions } })}
></ComplexTableLayout>
