<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Button from '$lib/components/button/Button.svelte';
  import { get } from 'svelte/store';
  import { api } from '$lib/api';

  /** Page data of a workflow trigger specified by `id` in the url */
  export let data;

  const { trigger, infoHeader, workflowHeader } = data;
</script>

<!--
  @component
  Displays information about a workflow trigger specified by `id`,
  including an interactive node-based diagram for visualizing the workflow
-->
<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
  <DynCard header={infoHeader} data={trigger} />
  <DynCard header={workflowHeader} data={trigger} />
</div>
<Button on:click={async (x) => await get(api).GET(`workflows/editor/${x.name}`, { fetch })}>
  Create Workflow if not existent
</Button>
