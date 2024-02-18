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
  import { createEventDispatcher } from 'svelte';
  import { invalidateAll } from '$app/navigation';
  import CardRow from '$lib/components/card/CardRow.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import { isEqual } from 'lodash-es';

  const dispatch = createEventDispatcher<{ close: void }>();

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
    e.preventDefault();
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

  const finalSubmit: EventHandler<SubmitEvent, HTMLFormElement> = (e) => {
    e.preventDefault();
    const { default_comment } = getFormValues(e);
    notifySave(
      $api
        // @ts-expect-error Not in the OpenAPI spec
        .POST('/events/saveFreeText/{eventId}', {
          params: { path: { eventId: $page.params.id } },
          body: {
            Attribute: {
              force: '0',
              JsonObject: JSON.stringify(freetextData),
              default_comment
            }
          }
        })
        .then((resp) => {
          if (resp.error) throw new Error(resp.error.message);
        })
    );
    invalidateAll();
    dispatch('close');
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
      <Button type="submit">Submit</Button>
    </form>
  {:else}
    <form on:submit={finalSubmit} class="flex flex-col gap-2">
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
        editActions={[
          {
            icon: 'mdi:delete',
            label: 'Delete',
            action: (x) =>
              x.forEach((row) => (freetextData = freetextData.filter((d) => !isEqual(row, d))))
          }
        ]}
      ></ComplexTableLayout>
      <CardRow>
        <span>Default comment</span>
        <Input name="default_comment" />
      </CardRow>
      <Button type="submit">Submit</Button>
    </form>
  {/if}
</div>
