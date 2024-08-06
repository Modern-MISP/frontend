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
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { notifications } from '$lib/stores';
import { successPill } from '$lib/util/pill.util';
import { invalidateAll } from '$app/navigation';

export const load = async ({ fetch }) => {
  // @ts-expect-error Not in the OpenAPI spec. great.
  const getResult = await get(api).GET('/workflows/index', { fetch });
  const { error: mispError, response } = getResult;
  const data = (getResult.data! as { Workflow: Trigger['Workflow'] }[]).map((x) => x.Workflow!);
  // eslint-disable-next-line no-warning-comments
  //TODO: types of status and message are not set, therefor .status an .message default to never
  if (mispError) error(response['status'] as NumericRange<400, 599>, mispError['message']);

  console.log(data);

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

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Export',
      icon: 'mdi:download',
      action(x) {
        console.log(x);
    },
    {
      label: 'Delete Workflow',
      icon: 'mdi:delete-outline',
      action: (x) => {
        Promise.all(
          x
            .map((y) => y.id)
            .map((workflowId) =>
              // @ts-expect-error Not in the OpenAPI spec?
              get(api).DELETE('/workflows/delete/{workflowId}', {
                fetch,
                params: { path: { workflowId: workflowId! } }
              })
            )
        ).then(() => {
          notifications.add(successPill('Deleted workflow ' + x.map((y) => y.id).join(', ')));
          invalidateAll();
        });
      }
    },
    {
      label: 'Toggle Debug Mode',
      icon: 'mdi:bug',
      action: (x) => {
        Promise.all(
          x.map((workflow) =>
            // @ts-expect-error Not in the OpenAPI spec?
            get(api).POST('/workflows/debugToggleField/{workflowId}/{enabled}', {
              fetch,
              params: { path: { workflowId: workflow.id!, enabled: !workflow.debug_enabled } }
            })
          )
        ).then(() => {
          notifications.add(
            successPill('Toggled Debug Mode of Workflow ' + x.map((y) => y.id).join(', '))
          );
          invalidateAll();
        });
      }
    }
  ];

  return {
    tableData: data,
    header,
    editActions
  };
};
