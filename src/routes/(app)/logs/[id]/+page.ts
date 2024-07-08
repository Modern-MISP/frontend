import type { PageLoad } from './$types';
import { get } from 'svelte/store';
import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Info from '$lib/components/info/Info.svelte';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import type { Log } from '../log';

export const load: PageLoad = async ({ params, fetch }) => {
  // @ts-expect-error Not in OpenAPI spec
  //TODO Icons + API Endpoint
  const getResult = await get(api).GET('/logs/index/{logId}', {
    fetch,
    params: { path: { logId: params.id } }
  });
  const { response, error: mispError } = getResult;
  const log = getResult.data as Log;

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<typeof log>();

  const infoHeader = [
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => x.Log.id ?? 'unknown'
    }),
    col({
      icon: 'mdi:ip-outline',
      key: 'ip',
      label: 'IP',
      value: (x) => ({ display: Info, props: { text: x.Log.ip } })
    }),
    col({
      icon: 'mdi:email',
      key: 'email',
      label: 'E-Mail',
      value: (x) => ({ display: Info, props: { text: x.Log.email } })
    }),
    col({
      icon: 'mdi:factory', //or mdi:store-outline
      key: 'org',
      label: 'Organisation',
      value: (x) => ({ display: Info, props: { text: x.Log.org } })
    }),
    col({
      icon: 'mdi:timer-edit-outline',
      key: 'created',
      label: 'Created',
      value: (x) => ({ display: Info, props: { text: x.Log.created } })
    }),
    col({
      icon: 'mdi:dots-circle',
      key: 'model',
      label: 'Model',
      value: (x) => ({ display: Info, props: { text: x.Log.model } })
    }),
    col({
      icon: 'mdi:id-card',
      key: 'model-id',
      label: 'Model-ID',
      value: (x) => x.Log.model_id ?? 'unknown'
    }),
    col({
      icon: 'mdi:autorenew',
      key: 'action',
      label: 'Action',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Log.action } })
    }),
    col({
      icon: 'mdi:subtitles-outline',
      key: 'title',
      label: 'Title',
      value: (x) => ({ display: Info, props: { text: x.Log.title } })
    }),
    col({
      icon: 'mdi:swap-horizontal',
      key: 'change',
      label: 'Change',
      value: (x) => ({ display: Info, props: { text: x.Log.change } })
    }),
    col({
      icon: 'mdi:id-card',
      key: 'user_id',
      label: 'User ID',
      value: (x) => x.Log.user_id ?? 'unknown'
    }),
    col({
      icon: 'mdi:text-box-outline',
      key: 'description',
      label: 'Description',
      value: (x) => ({ display: Info, props: { text: x.Log.description } })
    })
  ];

  return {
    log,
    infoHeader
  };
};
