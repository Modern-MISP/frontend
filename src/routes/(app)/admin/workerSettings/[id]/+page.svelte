<script lang="ts">
  import type { PageData } from './$types';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';

  /** Page data containing data of the users with the 'id' in the url */
  export let data: PageData;

  $: ({ jobs, jobs_header, jobqueues, jobqueues_header, queueEditActions } = data);
</script>

<!--
  @component
  Displays information about a specific worker, specified by `id`.
-->
<div class="flex-wrap w-full h-full gap-2 lg:flex-nowrap">
  <SideMenuEntry href="/logs/" name="Logs" icon="mdi:tag" isMenuOpen={true}></SideMenuEntry>
  <div class="flex flex-wrap w-full h-full gap-2 lg:flex-nowrap">
    <div>
      <ComplexTableLayout
        header={jobs_header}
        tableData={jobs}
        tableHref={() => undefined}
        editActions={[]}
      />
    </div>
    <div>
      <ComplexTableLayout
        header={jobqueues_header}
        tableData={jobqueues}
        tableHref={() => undefined}
        editActions={queueEditActions}
      />
    </div>
  </div>
</div>
