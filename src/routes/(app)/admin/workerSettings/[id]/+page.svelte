<script lang="ts">
  import type { PageData } from './$types';
  import SideMenuEntry from '$lib/components/menus/sidemenu/SideMenuEntry.svelte';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  /** Page data containing data of the worker with the 'id' in the url */
  export let data: PageData;

  $: ({ jobs, jobs_header, returningJobs, returningJobs_header, jobqueues, jobqueues_header } =
    data);
</script>

<!--
  @component
  Displays information about a specific worker, specified by `id`.
-->
<div class="flex-wrap w-full h-full gap-2 lg:flex-nowrap">
  <SideMenuEntry href="/logs/1" name="Logs" icon="mdi:tag" isMenuOpen={true}></SideMenuEntry>
  <div class="flex flex-wrap w-full h-full gap-2 lg:flex-nowrap">
    <ComplexTableLayout header={jobs_header} tableData={jobs} tableHref={() => undefined} />
    <ComplexTableLayout
      header={returningJobs_header}
      tableData={returningJobs}
      tableHref={() => undefined}
    />
    <ComplexTableLayout
      header={jobqueues_header}
      tableData={jobqueues}
      tableHref={() => undefined}
    />
  </div>
</div>
