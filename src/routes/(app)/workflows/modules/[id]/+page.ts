import { api } from '$lib/api';
import { get } from 'svelte/store';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import Info from '$lib/components/info/Info.svelte';
import type { Module } from '../module';

export const load: PageLoad = async ({ params, fetch }) => {
  /// @ts-expect-error Not in OpenAPI spec
  const getResult = await get(api).GET('/workflows/moduleView/{moduleId}', {
    fetch,
    params: { path: { moduleId: params.id } }
  });
  const { response, error: mispError } = getResult;
  const module = getResult.data as Module;

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<typeof module>();

  const infoHeader = [
    col({
      icon: 'mdi:id-card',
      key: 'name',
      label: 'Name',
      value: (x) => ({ display: Info, props: { text: x.name ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => ({ display: Info, props: { text: x.id ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:circle',
      key: 'type',
      label: 'Type',
      value: (x) => ({ display: Info, props: { text: x.module_type ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:checkbox-outline',
      key: 'enabled',
      label: 'Enabled',
      value: (x) => ({ display: Boolean, props: { isTrue: !x.disabled } })
    }),
    col({
      icon: 'mdi:circle',
      key: 'misp_module',
      label: 'Is MISP Module',
      value: (x) => ({ display: Boolean, props: { isTrue: x.is_misp_module ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'description',
      label: 'Description',
      value: (x) => ({ display: Info, props: { text: x.description ?? '' } })
    })
  ];

  return {
    module,
    infoHeader
  };
};
