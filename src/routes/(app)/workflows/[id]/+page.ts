import { api } from '$lib/api';
import { get } from 'svelte/store';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error, type NumericRange } from '@sveltejs/kit';
import Info from '$lib/components/info/Info.svelte';
import type { Trigger } from '../triggers/trigger';

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
  const workflow = (data as { Workflow: Trigger['Workflow'] }).Workflow!;

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

  return {
    workflow,
    infoHeader
  };
};
