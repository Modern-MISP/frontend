import { api } from '$lib/api';
import { get } from 'svelte/store';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { THREAT_LEVEL_LOOKUP } from '$lib/consts/PillLookups';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Trigger } from './trigger';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { invalidateAll } from '$app/navigation';

export const load: PageLoad = async ({ fetch }) => {
  /// @ts-expect-error Not in the OpenAPI spec.. great.
  const getResult = await get(api).GET('/workflows/triggers', { fetch });
  const { error: mispError, response } = getResult;
  const data = getResult.data as unknown as Trigger[];

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    col({
      icon: 'mdi:id-card',
      key: 'name',
      label: 'Name',
      value: (x) => ({ display: Info, props: { text: x.name ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:telescope',
      key: 'scope',
      label: 'Scope',
      value: (x) => ({
        display: Pill,
        props: { icon: 'mdi:telescope', text: x.scope ?? 'unknown' }
      })
    }),
    col({
      icon: 'mdi:head-alert',
      key: 'overhead',
      label: 'Overhead',
      value: (x) => ({
        display: LookupPill,
        props: { value: x.trigger_overhead, options: THREAT_LEVEL_LOOKUP }
      })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'description',
      label: 'Description',
      value: (x) => ({ display: Info, props: { text: x.description ?? '' } })
    }),
    col({
      icon: 'material-symbols:network-node',
      key: 'workflow',
      label: 'Workflow',
      value: (x) => ({
        display: HrefPill,
        props: {
          href: x.Workflow?.id ? `/workflows/${x.Workflow?.id}` : '#',
          icon: 'material-symbols:network-node',
          text: x.Workflow?.id ?? 'unknown'
        }
      })
    }),
    col({
      icon: 'mdi:run',
      key: 'run-counter',
      label: 'Run Count',
      value: (x) => ({
        display: Pill,
        props: { label: '#', text: x.Workflow?.counter ?? 'unknown' }
      })
    }),
    col({
      icon: 'mdi:checkbox-marked-outline',
      key: 'enabled',
      label: 'Enabled',
      value: (x) => ({ display: Boolean, props: { isTrue: !x.disabled } })
    }),
    col({
      icon: 'mdi:block-helper',
      key: 'blocking',
      label: 'Blocking',
      value: (x) => ({ display: Boolean, props: { isTrue: x.blocking } })
    }),
    col({
      icon: 'mdi:circle',
      key: 'misp-core-format',
      label: 'Core Format',
      value: (x) => ({ display: Boolean, props: { isTrue: x.misp_core_format } })
    }),
    col({
      icon: 'mdi:bug',
      key: 'debug-enabled',
      label: 'Debug',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Workflow?.debug_enabled } })
    }),
    col({
      icon: 'mdi:update',
      key: 'last-updated',
      label: 'Last Updated',
      value: (x) => ({
        display: DatePill,
        props: {
          date: x.Workflow?.timestamp ? new Date(+x.Workflow.timestamp * 1000) : null
        }
      })
    })
  ];

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Enable',
      icon: 'mdi:checkbox-outline',
      action: (x) => {
        if (!x) return;
        if (
          confirm(
            `Are you sure you want to enable the following triggers?\n${x.map((x) => x.id).join(', ')}`
          )
        ) {
          Promise.all(
            x.map((trigger) =>
              // @ts-expect-error Not in the OpenAPI spec
              get(api).POST('/workflows/toggleModule/{triggerId}/1/1', {
                fetch,
                params: { path: { triggerId: trigger.id } }
              })
            )
          ).then(invalidateAll);
        }
      }
    },
    {
      label: 'Disable',
      icon: 'mdi:close-box-outline',
      action: (x) => {
        if (!x) return;
        if (
          confirm(
            `Are you sure you want to disable the following triggers?\n${x.map((x) => x.id).join(', ')}`
          )
        ) {
          Promise.all(
            x.map((trigger) =>
              // @ts-expect-error Not in the OpenAPI spec
              get(api).POST('/workflows/toggleModule/{triggerId}/0/1', {
                fetch,
                params: { path: { triggerId: trigger.id } }
              })
            )
          ).then(invalidateAll);
        }
      }
    }
  ];

  return {
    tableData: data,
    header,
    editActions
  };
};
