import { api } from '$lib/api';
import { get } from 'svelte/store';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error, type NumericRange } from '@sveltejs/kit';
import type { Trigger } from './triggers/trigger.js';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';

export const load = async ({ fetch }) => {
  /// @ts-expect-error Not in the OpenAPI spec.. great.
  const getResult = await get(api).GET('/workflows/index', { fetch });
  const { error: mispError, response } = getResult;
  const data = (getResult.data! as { Workflow: Trigger['Workflow'] }[]).map((x) => x.Workflow!);

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => x.id!
    }),
    col({
      icon: 'mdi:circle',
      key: 'name',
      label: 'Name',
      value: (x) => ({ display: Info, props: { text: x.name ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'description',
      label: 'Description',
      value: (x) => ({ display: Info, props: { text: x.description ?? '' } })
    }),
    col({
      icon: 'material-symbols:network-node',
      key: 'trigger',
      label: 'Trigger',
      value: (x) => ({
        display: HrefPill,
        props: {
          href: `/workflows/triggers/${x.trigger_id}`,
          icon: 'material-symbols:line-start-diamond',
          text: x.trigger_id ?? 'unknown'
        }
      })
    }),
    col({
      icon: 'mdi:run',
      key: 'run-counter',
      label: 'Run Count',
      value: (x) => ({
        display: Pill,
        props: { label: '#', text: x.counter ?? 'unknown' }
      })
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
    tableData: data,
    header
  };
};
