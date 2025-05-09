<script lang="ts">
  import type { PageData } from './$types';
  import SideMenuEntry from '$lib/components/menus/sidemenu/SideMenuEntry.svelte';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  /** Page data containing data of the worker with the 'id' in the url */
  export let data: PageData;

  $: ({ jobs, jobs_header, jobqueues, jobqueues_header, queueEditActions } = data);
</script>

<!--
  @component
  Displays information about a specific worker, specified by `id`.
-->
<div class="flex flex-col w-full h-full">
  <div>
    <SideMenuEntry href="/logs/" name="Logs" icon="mdi:tag" isMenuOpen={true}></SideMenuEntry>
  </div>
  <div class="flex flex-row gap-2 w-full h-full">
    <ComplexTableLayout
      pagination={false}
      header={jobs_header}
      tableData={jobs}
      tableHref={() => undefined}
      editActions={[]}
      endpoint={undefined}
      maxCount={jobs.length}
    />
    <ComplexTableLayout
      header={jobqueues_header}
      tableData={jobqueues}
      tableHref={() => undefined}
      editActions={queueEditActions}
      maxCount={jobqueues.length}
    />
  </div>
</div>
