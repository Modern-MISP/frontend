<script lang="ts">
  import { page } from '$app/stores';
  import { api } from '$lib/api';
  import { getFormValues } from '$lib/util/form.util';
  import type { EventHandler } from 'svelte/elements';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
  import Pill from '$lib/components/pills/pill/Pill.svelte';
  import Info from '$lib/components/info/Info.svelte';
  import Button from '$lib/components/button/Button.svelte';
  import { notifySave } from '$lib/util/notifications.util';
  import { invalidateAll } from '$app/navigation';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

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

  const submit: EventHandler<SubmitEvent, HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { freetext } = getFormValues(e);
    await notifySave(
      $api
        // @ts-expect-error Not in the OpenAPI spec
        .POST('/events/freeTextImport/{eventId}', {
          params: { path: { eventId: $page.params.id } },
          body: {
            Attribute: {
              event_id: $page.params.id,
              value: freetext
            }
          }
        })
        .then((resp) => {
          if (resp.error) throw new Error(resp.error.message);
          freetextData = resp.data as ReturnData[];
          invalidateAll();
        })
    );
  };

  const col = createTableHeadGenerator<ReturnData, DynTableHeadExtent>();
</script>

<div class="h-full" id="freetext-import">
  {#if !freetextData}
    <form on:submit|preventDefault={submit} class="flex flex-col h-full gap-4">
      <textarea
        class="w-full h-full p-2 border rounded-md outline-none bg-surface0 border-sky"
        name="freetext"
      ></textarea>
      <Button class="self-end w-min text-sky" suffixIcon="mdi:arrow-right" type="submit">
        Submit
      </Button>
    </form>
  {:else}
    These attributes have been added:

    <ComplexTableLayout
      header={[
        col({
          label: 'Value',
          value: (x) => ({
            display: Pill,
            props: {
              text: x.value
            }
          }),
          icon: 'mdi:circle',
          key: 'value'
        }),
        col({
          icon: 'mdi:circle',
          key: 'category',
          label: 'Category',
          value: (x) => ({
            display: Pill,
            props: {
              text: x.category
            }
          })
        }),
        col({
          icon: '',
          key: 'type',
          label: 'Type',
          value: (x) => ({ display: Info, props: { text: x.type ?? '' } })
        })
      ]}
      tableData={freetextData}
    ></ComplexTableLayout>
  {/if}
</div>
