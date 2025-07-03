import { api } from '$lib/api';
import { get } from 'svelte/store';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await get(api).GET('/object_templates/view/{objectTemplateId}', {
    params: { path: { objectTemplateId: params.id } },
    fetch
  });
  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);
  const cardData = data.ObjectTemplate;

  const fac = createTableHeadGenerator<NonNullable<typeof cardData>[number], DynTableHeadExtent>();

  const header = [
    fac({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => ({
        display: Info,
        props: { text: x.id! }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'uuid',
      label: 'UUID',
      value: (x) => ({
        display: Info,
        props: { text: x.uuid }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'name',
      label: 'Name',
      value: (x) => ({
        display: Info,
        props: { text: x.name }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'meta-category',
      label: 'Meta Category',
      value: (x) => ({
        display: Info,
        props: { text: x['meta-category'] }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'description',
      label: 'description',
      value: (x) => ({
        display: Info,
        props: { text: x.description }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'version',
      label: 'version',
      value: (x) => ({
        display: Info,
        props: { text: x.version }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'fixed',
      label: 'fixed',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.fixed }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'active',
      label: 'active',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.active }
      })
    })
  ];

  const filter = [];
  const topMenuActions: ActionBarEntryProps[] = [];

  const editActions: DynCardActionHeader<typeof data>[] = [];

  const fastFilter: FastFilter[] = [];

  const objectTemplateElementsHeader = [
    fac({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => ({
        display: Info,
        props: { text: x.id! }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'type',
      label: 'Attribute Type',
      value: (x) => ({
        display: Info,
        props: { text: x.type }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'object_relation',
      label: 'Relation',
      value: (x) => ({
        display: Info,
        props: { text: x.object_relation }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'description',
      label: 'Description',
      value: (x) => ({
        display: Info,
        props: { text: x.description }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'categories',
      label: 'Categories',
      value: (x) => ({
        display: Info,
        props: { text: x.categories }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'sane_default',
      label: 'Sane Default',
      value: (x) => ({
        display: Info,
        props: { text: x.sane_default }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'values_list',
      label: 'Values list',
      value: (x) => ({
        display: Info,
        props: { text: x.values_list }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'multiple',
      label: 'Multiple Attributes',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.multiple }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'multiple',
      label: 'Disable Correlation',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.disable_correlation }
      })
    })
  ];

  return {
    objectTemplate: cardData,
    objectTemplateHeader: header,
    objectTemplateElements: {
      header: objectTemplateElementsHeader,
      tableData: data.ObjectTemplateElement.sort((a, b) => b['ui-priority'] - a['ui-priority']),
      filter,
      topMenuActions,
      editActions,
      fastFilter
    }
  };
};
