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
  import { goto, invalidateAll } from '$app/navigation';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
    import { get } from 'svelte/store';

  type ReturnData = {
    types: string[];
    default_type: string;
    value: string;
  };

  let freetextData;

  const submit: EventHandler<SubmitEvent, HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { freetext } = getFormValues(e);
    await notifySave(
      $api
        // @ts-expect-error Not in the OpenAPI spec
        .POST('/events/freeTextImport/', {
          params: { path: { eventId: $page.params.id } },
          body: {
            Attribute: {
              event_id: $page.params.id,
              value: freetext
            }
          }
        })
        .then((resp) => {
          if (resp.error) throw new Error(resp.error.detail);
          getResponseData(resp.data.id);
        })
    );
  };

  async function getResponseData(job_id:string) {
    await $api
      .GET('/jobs/{job_id}', {
        params: { path: { job_id } }
      })
      .then(async (resp) => {
        if (resp.error) {
          if (resp.response.status == 409) {
            await new Promise(f => setTimeout(f, 1000));
            getResponseData(job_id);
          } else {
            throw new Error(resp.error.detail);
          }
        }
        if (resp.data.attributes) {
          freetextData = resp.data.attributes;
          console.log(freetextData);
        }
      });
  }

  const col = createTableHeadGenerator<ReturnData, DynTableHeadExtent>();
  const actionBar: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Save',
      icon: 'mdi:content-save',
      action: (x) => {
        get(api).POST('/events/freeTextImport/{eventId}', {
          params: { path: { eventId: $page.params.id } },
          body: { attributes: x }
        }).then((resp) => {
          if (resp.error) throw new Error(resp.error.detail);
          invalidateAll();
        });
      }
    }
  ];
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
          icon: '',
          key: 'type',
          label: 'Type',
          value: (x) => ({ display: Info, props: { text: x.default_type ?? '' } })
        })
      ]}
      tableData={freetextData}
      editActions={actionBar}
    ></ComplexTableLayout>
  {/if}
</div>
