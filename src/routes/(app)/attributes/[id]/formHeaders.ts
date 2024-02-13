import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import Select from '$lib/components/form/Select.svelte';
import Input from '$lib/components/input/Input.svelte';
import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';
import type { PageData } from './$types';
import { format } from 'date-fns';
import attributeCols, { editAttributeCols } from '../attributeCols';

const col = createTableHeadGenerator<PageData['attribute']>();

const editCols = editAttributeCols();

export const header = [
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
