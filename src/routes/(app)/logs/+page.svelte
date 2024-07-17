<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  export let data;

  //TODO Filters?
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

<ComplexTableLayout {...data} tableHref={(x) => `/logs/index/${x.id}`}></ComplexTableLayout>
