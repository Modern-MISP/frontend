<script lang="ts">
  import { lockViewMode } from '$lib/actions';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import KeyValueEditor from '$lib/components/keyValueEditor/KeyValueEditor.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import { mode } from '$lib/stores';
  import { notifySave } from '$lib/util/notifications.util.js';
  import { get } from 'svelte/store';

  /** Data that is provided +page.ts on page load. */
  export let data;

  const { cardData, leftCardHeader, rightCardHeader, tableData, tableHeader } = data;

  let entries = tableData.map(({ key, value }) => [key ?? '', value ?? '']);

  function formCallback(formData: Record<string, string>) {
    notifySave(
      get(api)
        .PUT('/galaxy_clusters/edit/{galaxyClusterId}', {
          params: { path: { galaxyClusterId: data.cardData!.id! } },
          body: {
            ...formData,
            GalaxyElement: entries.map(([key, value]) => ({
              key,
              value,
              id: tableData.find((d) => d.key === key)?.id
            }))
          }
        })
        .then((resp) => {
          if (resp.error) throw new Error(resp.error.message);
        })
    );
  }
</script>

<!--
  @component

  Show all information about a single galaxy cluster, including its elements.
-->

<svelte:window use:lockViewMode={data.cardData?.default ?? false} />

<Form callback={formCallback}>
  <div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
    <DynCard header={leftCardHeader} data={cardData}></DynCard>
    <DynCard header={rightCardHeader} data={cardData}></DynCard>
  </div>
</Form>

{#if $mode === 'view'}
  <DynTable header={tableHeader} data={tableData} />
{:else}
  <KeyValueEditor bind:entries></KeyValueEditor>
{/if}
