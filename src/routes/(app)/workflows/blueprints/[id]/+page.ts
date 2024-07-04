import type { PageLoad } from '../../../../../../.svelte-kit/types/src/routes/(app)/workflows/modules/[id]/$types'; //TODO types
import { get } from 'svelte/store';
import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Info from '$lib/components/info/Info.svelte';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import type { Blueprint } from '../blueprint';

export const load: PageLoad = async ({ params, fetch }) => {
  // @ts-expect-error Not in OpenAPI spec
  //TODO Icons + API Endpoint
  const getResult = await get(api).GET('/workflowBlueprints/view/{blueprintId}', {
    fetch,
    params: { path: { blueprintId: params.id } }
  });
  const { response, error: mispError } = getResult;
  const blueprint = getResult.data as Blueprint;

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<typeof blueprint>();

  const infoHeader = [
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => ({ display: Info, props: { text: x.id ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:id-card',
      key: 'uuid',
      label: 'UUID',
      value: (x) => ({ display: Info, props: { text: x.uuid ?? 'unknown' } })
    }),
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
      icon: 'mdi:circle',
      key: 'timestamp',
      label: 'Timestamp',
      value: (x) => ({ display: Info, props: { text: x.timestamp ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:checkbox-marked-outline',
      key: 'default',
      label: 'Default Blueprint',
      value: (x) => ({ display: Boolean, props: { isTrue: !x.default } })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'data',
      label: 'Data',
      value: (x) => ({ display: Info, props: { text: x.data ?? '' } })
    })
  ];

  return {
    blueprint,
    infoHeader
  };
};
