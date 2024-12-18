import Info from '$lib/components/info/Info.svelte';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { notifications } from '$lib/stores';
import { errorPill, successPill } from '$lib/util/pill.util';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { invalidateAll } from '$app/navigation';
import { api } from '$lib/api';
import { get } from 'svelte/store';
import { writable } from 'svelte/store';
import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';

export const load: PageLoad = async ({ fetch }) => {
  const { data, error: mispError, response } = await get(api).GET('/worker/all', { fetch });
  console.log(data);
  // eslint-disable-next-line no-warning-comments
  //TODO: types of status and message are not set, therefor .status an .message default to never
  if (mispError) error(response['status'] as NumericRange<400, 599>, mispError['message']);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const passwordStore = writable('');

  function showPasswordPopup(password) {
    passwordStore.set(password);
    const popup = document.getElementById('password-popup');
    if (popup) popup.style.display = 'block';
  }

  const header = [
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'Worker ID',
      value: (x) => ({ display: Info, props: { text: String(x?.id) ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:id-card',
      key: 'status',
      label: 'Status',
      value: (x) => ({ display: Info, props: { text: x?.status ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:queue-first-in-last-out',
      key: 'queues',
      label: 'Queues',
      value: (x) => ({
        display: PillCollection,
        props: {
          pills: x?.queues.map((x) => {
            console.log(x);
            return {
              text: x ?? 'unknown'
            };
          })
        }
      })
    }),
    col({
      icon: 'mdi:math-integral',
      key: 'jobCount',
      label: 'Job Count',
      value: (x) => ({ display: Info, props: { text: String(x?.jobCount) ?? 'unknown' } })
    })
  ];

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Pause Workers',
      icon: 'mdi:pause-circle',
      action: (x) => {
        if (confirm(`Are you sure you want to pause all Workers? No new jobs will be executed!`)) {
          get(api)
            .POST('/worker/all', { fetch })
            .then(() => {
              notifications.add(successPill('Paused all Workers'));
              invalidateAll();
            });
        } else {
          notifications.add(errorPill('Pause failed'));
        }
      }
    },
    {
      label: 'Clear Workerqueues',
      icon: 'mdi:delete',
      action: (x) => {
        if (confirm(`Are you sure you want to clear all Workerqueues? All jobs will be lost!`)) {
          Promise.all(x).then(() => {
            notifications.add(successPill('Not implemented'));
            invalidateAll();
          });
        } else {
          notifications.add(errorPill('Clear failed'));
        }
      }
    }
  ].filter((x) => typeof x !== 'undefined');

  return {
    data,
    tableData: data,
    header,
    editActions,
    maxCount: data.length,
    passwordStore
  };
};
