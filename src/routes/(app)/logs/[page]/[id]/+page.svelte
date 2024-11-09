<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';

  export let data;

  const { log, infoHeader } = data;
</script>

<!--
  @component

  A list of all properties of a specific log entry. Contains following information about the logs:
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
  - Description
  - User-ID

-->

<div>
  <DynCard header={infoHeader} data={log} />
</div>
