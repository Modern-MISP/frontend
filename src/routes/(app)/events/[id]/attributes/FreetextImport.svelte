<script lang="ts">
  import { page } from '$app/stores';
  import { api } from '$lib/api';
  import { getFormValues } from '$lib/util/form.util';
  import type { EventHandler } from 'svelte/elements';
  import Input from '$lib/components/input/Input.svelte';
  import CardRow from '$lib/components/card/CardRow.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';

  type ReturnData = {
    value: string;
    original_value: string;
    to_ids: 0 | 1;
    type: string;
    category: string;
    distribution: number;
    event_id: string;
  };

  let freetextData: ReturnData[];

  const initialSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (e) => {
    const { freetext } = getFormValues(e);
    // @ts-expect-error Not in the OpenAPI spec
    const { data } = await $api.POST('/events/freeTextImport/{eventId}', {
      params: { path: { eventId: $page.params.id } },
      body: {
        Attribute: {
          event_id: $page.params.id,
          value: freetext
        }
      }
    });
    freetextData = data as ReturnData[];
  };

  const finalSubmit = () => {
    // @ts-expect-error Not in the OpenAPI spec
    $api.POST('/events/saveFreeText/{eventId}', {
      params: { path: { eventId: $page.params.id } },
      body: {
        Attribute: {
          force: '0',
          JsonObject: 'foo',
          default_comment: ''
        }
      }
    });
  };

  const col = createTableHeadGenerator<ReturnData, DynTableHeadExtent>();
</script>

<div>
  {#if !freetextData}
    <form on:submit|preventDefault={initialSubmit}>
      <textarea
        class="w-full h-full p-2 border rounded-md outline-none bg-surface0 border-sky"
        name="freetext"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  {:else}
    <DynTable
      header={[
        col({
          label: 'Value',
          value: (x) => ({
            display: Input,
            props: {
              value: x.value,
              name: 'value'
            }
          }),
          icon: 'mdi:circle',
          key: 'value'
        })
      ]}
      data={freetextData}
    ></DynTable>
    <CardRow>
      <span>Default comment</span>
      <Input name="default_comment" />
    </CardRow>
    <button on:click={finalSubmit}>Submit</button>
  {/if}
</div>
