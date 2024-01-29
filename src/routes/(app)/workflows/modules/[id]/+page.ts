import { GET } from '$lib/api';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { filter } from 'lodash-es';
import Info from '$lib/components/info/Info.svelte';

export const load: PageLoad = async ({ params, fetch }) => {
  const { data, error: mispError, response } = await GET('/workflows/moduleIndex', { fetch }); // TODO: check for alternative endpoint/solution

  if (mispError) error(response.status, mispError.message);

  const module = filter(data, (x) => x.id === params.id).at(0) ?? {};

  const col = createTableHeadGenerator<typeof module>();

  const infoHeader = [
    col({
      icon: 'mdi:id-card',
      key: 'name',
      label: 'Name',
      value: (x) => ({ text: x.name ?? 'unknown' }),
      display: Info
    }),
    col({
        icon: 'mdi:id-card',
        key: 'id',
        label: 'ID',
        value: (x) => ({ text: x.id ?? 'unknown' }),
        display: Info
    }),
    col({
        icon: 'mdi:circle',
        key: 'type',
        label: 'Type',
        value: (x) => ({ text: x.module_type ?? 'unknown'}),
        display: Info
    }),
    col({
        icon: 'mdi:checkbox-outline',
        key: 'enabled',
        label: 'Enabled',
        value: (x) => ({ isTrue: !x.disabled }),
        display: Boolean
    }),
    col({
        icon: 'mdi:circle',
        key: 'misp_module',
        label: 'Is Misp Module',
        value: (x) => ({ isTrue: x.misp_module ?? 'unknown'}),
        display: Boolean
    }),
    col({
        icon: 'mdi:information-outline',
        key: 'description',
        label: 'Description',
        value: (x) => ({ text: x.description ?? ''}),
        display: Info
    })
  ];

  return {
    module,
    infoHeader
  };
};