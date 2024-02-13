import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import attributeCols, { editAttributeCols } from './attributeCols';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';

export const load: PageLoad = async ({ fetch }) => {
  const {
    response,
    data,
    error: mispError
  } = await get(api).POST('/attributes/restSearch', { fetch, body: { limit: 50, page: 1 } });

  if (mispError) throw error(response.status as NumericRange<400, 599>, mispError.message);

  const tableData = data.response?.Attribute ?? [];
  console.log(tableData);

  const col = createTableHeadGenerator<(typeof tableData)[number], DynTableHeadExtent>();

  const header = [
    col(attributeCols.id),
    col(attributeCols.event),
    //org
    col(attributeCols.category),
    col(attributeCols.type),
    col(attributeCols.value),
    col(attributeCols.comment),
    col(attributeCols.distribution),
    col(attributeCols.correlation_flag),
    col(attributeCols.ids_flag),
    col(attributeCols.date)
    //tags
    //related events
    //sightings
  ];

  const describeTypes = await get(api).GET('/attributes/describeTypes');
  if (describeTypes.error)
    throw error(
      describeTypes.response.status as NumericRange<400, 599>,
      describeTypes.error.message
    );

  const filterCols = editAttributeCols(
    // cast type to fix wrong MISP API spec
    (describeTypes.data as unknown as { result: typeof describeTypes.data }).result
  );

  const fil = createTableHeadGenerator<undefined>();
  const filter = [
    //TODO filter: org
    fil({
      label: 'Category',
      ...filterCols.category
    }),
    fil({
      label: 'Type',
      ...filterCols.type
    }),
    fil({
      label: 'Value',
      value: () => 'value'
    }),
    fil({
      label: 'Correlation Flag',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'correlation_flag'
        }
      })
    }),
    fil({
      label: 'IDS flag',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'ids_flag'
        }
      })
    }),
    //TODO: filter tags
    //TODO: filter attributes with/without sightings
    fil({
      label: 'Value',
      value: () => 'value'
    }),
    fil({
      label: 'Search all',
      value: () => 'searchall'
    }),
    // You can override the page limit with this.

    fil({
      label: 'Page Limit',
      value: () => 'limit'
    })
  ];
  const topMenuActions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:event-add',
      label: 'Add Attributes',
      action: '' //TODO: /attributes/new
    },
    {
      icon: 'mdi:pencil-outline',
      label: 'Freetext Import Tool',
      action: '' //TODO: freetext import tool
    },
    {
      icon: 'mdi:pencil-outline',
      label: 'Attribute Replacement Tool',
      action: '' //TODO: attribute replacement tool
    }
  ];

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Delete Attribute',
      icon: 'mdi:delete-outline',
      class: 'text-red',
      action: () => '' //TODO: delete attribute
    }
  ];
  return {
    header,
    tableData,
    filter,
    topMenuActions,
    editActions
  };
};
