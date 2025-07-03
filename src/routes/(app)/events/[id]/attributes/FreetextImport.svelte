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
  import { get } from 'svelte/store';

  type ReturnData = {
    types: string[];
    default_type: string;
    value: string;
    to_ids: boolean;
  };

  let freetextData;

  const submit: EventHandler<SubmitEvent, HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { freetext } = getFormValues(e);
    await notifySave(
      $api
        // @ts-expect-error Not in the OpenAPI spec
        .POST('/events/freeTextImport/{eventId}', {
          params: { path: { eventId: $page.params.id } },
          body: {
            returnMetaAttributes: true,
            value: freetext
          }
        })
        .then((resp) => {
          console.log(resp);
          console.log('Response is', resp.response);
          console.log('Redirected is', resp.response.redirected);
          console.log('Status is', resp.response.status);
          if (resp.response.redirected && resp.response.status == 409) {
            // get job id
            console.log('Retrying...');
            const parts = resp.response.url.split('/');
            const jobType = parts[parts.length - 2];
            const jobId = parts[parts.length - 1];

            getJobResult(jobType, jobId).then((result) => {
              freetextData = result;
            });
          } else if (resp.error) {
            throw new Error(resp.error.detail);
          } else {
            if (resp.data['attributes']) {
              freetextData = resp.data['attributes'];
            } else if (resp.data) {
              freetextData = resp.data;
            }
          }
        })
    );
  };

  async function getJobResult(jobType: string, jobId: string) {
    console.log('Retrieving job result from api');
    const resp = await $api.GET('/jobs/{jobType}/{jobId}', {
      params: { path: { jobType, jobId } }
    });
    if (resp.error) {
      console.log('Got an error from jobs api with response:', resp['response']);
      if (resp['response']['status'] == 409) {
        await new Promise((f) => setTimeout(f, 2000));
        return await getJobResult(jobType, jobId);
      } else {
        throw new Error(resp['error']['detail']);
      }
    } else if (resp.data['attributes']) {
      return resp.data['attributes'];
    } else if (resp.data) {
      return resp.data;
    }
  }

  const col = createTableHeadGenerator<ReturnData, DynTableHeadExtent>();
  const actionBar: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Save',
      icon: 'mdi:content-save',
      action: (x) => {
        x.forEach((y) => {
          get(api)
            .POST('/attributes/add/{eventId}', {
              params: { path: { eventId: $page.params.id } },
              body: {
                type: y.default_type,
                value: y.value,
                to_ids: y.to_ids
              }
            })
            .then((resp) => {
              if (resp.error) throw new Error(resp.error.detail);
              invalidateAll();
            });
        });
        invalidateAll();
      }
    }
  ];
</script>

<div class="h-full" id="freetext-import">
  {#if !freetextData}
    <form on:submit|preventDefault={submit} class="flex flex-col h-full gap-4">
      <textarea
        class="w-full h-full p-2 border rounded-md outline-none bg-ctp-surface0 border-sky"
        name="freetext"
      ></textarea>
      <Button class="self-end w-min text-ctp-sky" suffixIcon="mdi:arrow-right" type="submit">
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
