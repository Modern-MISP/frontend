import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import Input from '$lib/components/input/Input.svelte';
import type { PageData } from './$types';
import { format } from 'date-fns';
import attributeCols, { editAttributeCols } from '../attributeCols';
import { get } from 'svelte/store';
import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';

const col = createTableHeadGenerator<PageData['attribute']>();

export const header = async () => {
  const { error: mispError, data, response } = await get(api).GET('/attributes/describeTypes');
  if (mispError) throw error(response.status as NumericRange<400, 599>, mispError.message);

  const editCols = editAttributeCols(
    // cast type to fix wrong MISP API spec
    (data as unknown as { result: typeof data }).result
  );

  return [
    col(attributeCols.id),
    col(attributeCols.event),
    //org
    col(attributeCols.category, editCols.category),
    col(attributeCols.type, {
      //TODO: Select
    }),
    col(attributeCols.value, editCols.value),
    col(attributeCols.comment, editCols.comment),
    col(attributeCols.distribution, editCols.distribution),
    //Batch Import Flag
    col(attributeCols.correlation_flag, {
      value: (x) => ({
        display: Checkbox,
        props: {
          checked: !x?.disable_correlation,
          name: 'correlate'
        }
      })
    }),
    col(attributeCols.ids_flag, {
      value: (x) => ({
        display: Checkbox,
        props: {
          checked: x?.to_ids ?? false,
          name: 'to_ids'
        }
      })
    }),
    col(attributeCols.date, {
      value: (x) => ({
        display: Input,
        props: {
          value: x?.timestamp ? format(new Date(+x.timestamp * 1000), 'yyyy-MM-dd') : undefined,
          name: 'date',
          type: 'date'
        }
      })
    }),
    //TODO: add/remove sightings -> click on add sighting or smth
    col(attributeCols.first_sighting),
    col(attributeCols.last_sighting)
    //tags
    //related events
    //sightings
  ];
};
