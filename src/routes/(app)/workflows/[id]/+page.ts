import { api } from '$lib/api';
import { get } from 'svelte/store';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error, type NumericRange } from '@sveltejs/kit';
import type { Module } from '../modules/module';
import type { CheckGraphResult, Workflow, WorkflowData } from '../workflow';
import { invalidateAll } from '$app/navigation';
import { notifications } from '$lib/stores';

export const load = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
    // @ts-expect-error '/workflows/view' is not specified within the OpenAPI spec
  } = await get(api).GET('/workflows/view/{workflowId}', {
    params: { path: { workflowId: params.id } },
    fetch
  });
  const workflow = (data as { Workflow: Workflow }).Workflow!;

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<typeof workflow>();

  const infoHeader = [
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => x.id!
    }),
    col({
      label: 'UUID',
      value: (x) => x.uuid!
    }),
    col({
      icon: 'mdi:circle',
      key: 'name',
      label: 'Name',
      value: (x) => ({ display: Info, props: { text: x.name ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:information',
      key: 'description',
      label: 'Description',
      value: (x) => ({ display: Info, props: { text: x.description ?? '' } })
    }),
    col({
      icon: 'mdi:run',
      key: 'run-counter',
      label: 'Run Count',
      value: (x) => ({
        display: Pill,
        props: { label: '#', text: x.counter ?? 'unknown' }
      }),
      display: Pill
    }),
    col({
      icon: 'mdi:checkbox-marked-outline',
      key: 'enabled',
      label: 'Enabled',
      value: (x) => ({ display: Boolean, props: { isTrue: x.enabled } })
    }),
    col({
      icon: 'mdi:bug',
      key: 'debug-enabled',
      label: 'Debug',
      value: (x) => ({ display: Boolean, props: { isTrue: x.debug_enabled } })
    }),
    col({
      icon: 'mdi:update',
      key: 'last-updated',
      label: 'Last Updated',
      value: (x) => ({
        display: DatePill,
        props: {
          date: x.timestamp ? new Date(+x.timestamp * 1000) : null
        }
      })
    })
  ];

  const moduleData = get(api)
    // @ts-expect-error Not in the OpenAPI spec
    .GET('/workflows/moduleIndex/type:all', { fetch })
    .then((result) => {
      if (result.error)
        error(result.response.status as NumericRange<400, 599>, result.error.message);
      return result.data as Module[];
    });

  async function checkGraph(constructWorkflowData: () => WorkflowData) {
    // @ts-expect-error Api does not support this
    const checkGraphResponse = await get(api).POST('/workflows/checkGraph', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: { graph: JSON.stringify(constructWorkflowData()) },
      bodySerializer: (x) => new URLSearchParams(x)
    });

    return checkGraphResponse.data as CheckGraphResult;
  }

  async function saveWorkflow(name: string, description: string, wfData: WorkflowData) {
    const formData = new FormData();
    formData.append('data[Workflow][name]', name);
    formData.append('data[Workflow][description]', description);
    formData.append('data[Workflow][data]', JSON.stringify(wfData));

    await get(api)
      // @ts-expect-error Not in the OpenAPI spec
      .POST('/workflows/edit/{workflowId}', {
        params: { path: { workflowId: params.id } },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: formData,
        bodySerializer: (x) => new URLSearchParams(x)
      })
      .then((resp) => {
        if (resp.error)
          throw Error(
            // @ts-expect-error MISP returns 'errors' property
            resp.error.errors ?? resp.error.message
          );
        notifications.add({
          icon: 'mdi:check',
          text: 'saved'
        });
      })
      .then(invalidateAll)
      .catch((error) => {
        notifications.add({
          icon: 'mdi:exclamation-thick',
          label: 'error',
          text: error.message,
          class: 'text-red'
        });
      });
  }

  async function toggleDebug(enable: boolean) {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('data[Token][unlocked]', '');

    get(api)
      // @ts-expect-error Not in the OpenAPI spec
      .POST('/workflows/debugToggleField/{workflowId}/{enabled}', {
        params: {
          path: {
            workflowId: params.id,
            enabled: enable ? '1' : '0'
          }
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: formData,
        bodySerializer: (x) => new URLSearchParams(x)
      })
      .then((resp) => {
        if (resp.error) throw Error(resp.error.message);
      })
      .then(invalidateAll)
      .catch((error) => {
        notifications.add({
          icon: 'mdi:exclamation-thick',
          label: 'error',
          text: error,
          class: 'text-red'
        });
      });
  }

  return {
    workflow,
    infoHeader,
    moduleData,
    checkGraph,
    saveWorkflow,
    toggleDebug
  };
};
