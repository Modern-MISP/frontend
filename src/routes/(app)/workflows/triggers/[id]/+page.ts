import { api } from '$lib/api';
import { get } from 'svelte/store';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import Info from '$lib/components/info/Info.svelte';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import { THREAT_LEVEL_LOOKUP } from '$lib/consts/PillLookups';
import type { Trigger } from '../trigger';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
    // @ts-expect-error '/workflows/moduleView' is not specified within the OpenAPI spec
  } = await get(api).GET('/workflows/moduleView/{triggerId}', {
    params: { path: { triggerId: params.id } },
    fetch
  });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const trigger = data as Trigger;

  const col = createTableHeadGenerator<typeof trigger>();

  const infoHeader = [
    col({
      icon: 'mdi:id-card',
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
      label: 'Overhead Info',
      value: (x) => ({
        display: Info,
        props: { text: x.trigger_overhead_message ?? 'none' }
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
    })
  ];

  const workflowHeader = trigger.Workflow
    ? [
        col({
          icon: 'material-symbols:network-node',
          key: 'workflow',
          label: 'Associated Workflow',
          value: (x) => ({
            display: HrefPill,
            props: {
              href: `/workflows/${x.Workflow!.id}`,
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
          }),
          display: Pill
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
      ]
    : [
        col({
          label: 'Associated Workflow',
          value: () => 'None'
        })
      ];

  return {
    trigger,
    infoHeader,
    workflowHeader
  };
};
