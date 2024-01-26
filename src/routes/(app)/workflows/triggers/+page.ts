import { GET } from '$lib/api';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { THREAT_LEVEL_LOOKUP } from '$lib/consts/PillLookups';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const { data, error: mispError, response } = await GET('/workflows/triggers', { fetch });

  if (mispError) error(response.status, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    col({
      icon: 'mdi:id-card',
      key: 'name',
      label: 'Name',
      value: (x) => ({ text: x.name ?? 'unknown' }),
      display: Info
    }),
    col({
      icon: 'mdi:telescope',
      key: 'scope',
      label: 'Scope',
      value: (x) => ({ icon: 'mdi:telescope', text: x.scope ?? 'unknown' }),
      display: Pill
    }),
    col({
      icon: 'mdi:head-alert',
      key: 'overhead',
      label: 'Overhead',
      value: (x) => ({ value: x.trigger_overhead, options: THREAT_LEVEL_LOOKUP }),
      display: LookupPill
    }),
    col({
      icon: 'mdi:information',
      key: 'description',
      label: 'Description',
      value: (x) => ({ text: x.description ?? '' }),
      display: Info
    }),
    col({
      icon: 'material-symbols:network-node',
      key: 'workflow',
      label: 'Workflow',
      value: (x) => ({ icon: 'material-symbols:network-node', text: x.Workflow?.id ?? 'unknown' }),
      display: Pill
    }),
    col({
      icon: 'mdi:run',
      key: 'run-counter',
      label: 'Run Count',
      value: (x) => ({ label: '#', text: x.Workflow?.counter ?? 'unknown' }),
      display: Pill
    }),
    col({
      icon: 'mdi:checkbox-marked-outline',
      key: 'enabled',
      label: 'Enabled',
      value: (x) => ({ isTrue: !x.disabled }),
      display: Boolean
    }),
    col({
      icon: 'mdi:block-helper',
      key: 'blocking',
      label: 'Blocking',
      value: (x) => ({ isTrue: x.blocking }),
      display: Boolean
    }),
    col({
      icon: 'mdi:circle',
      key: 'misp-core-format',
      label: 'Core Format',
      value: (x) => ({ isTrue: x.misp_core_format }),
      display: Boolean
    }),
    col({
      icon: 'mdi:bug',
      key: 'debug-enabled',
      label: 'Debug',
      value: (x) => ({ isTrue: x.Workflow?.debug_enabled }),
      display: Boolean
    }),
    col({
      icon: 'mdi:update',
      key: 'last-updated',
      label: 'Last Updated',
      value: (x) => ({
        date: x.Workflow?.timestamp ? new Date(+x.Workflow.timestamp * 1000) : null
      }),
      display: DatePill
    })
  ] as const;

  return {
    tableData: data,
    header
  };
};
