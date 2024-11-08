import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';

import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import Select from '$lib/components/form/Select.svelte';
import Input from '$lib/components/input/Input.svelte';
import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';

import type { components } from '$lib/api/misp';
import InputWithCheckbox from '$lib/components/inputWithCheckbox/InputWithCheckbox.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

export const load = async ({ params, fetch }) => {
  params;
  fetch;

  const tableData = {};

  const col = createTableHeadGenerator<
    typeof tableData & {
      Tag?: (components['schemas']['Tag'] & {
        relationship_type?: string;
        local?: boolean;
      })[];
    }
  >();

  const describeTypesResponse = await get(api).GET('/attributes/describeTypes');
  if (describeTypesResponse.error)
    throw error(
      describeTypesResponse.response.status as NumericRange<400, 599>,
      describeTypesResponse.error.message
    );
  const options: components['schemas']['DescribeAttributeTypesResponse'] = (
    describeTypesResponse.data as unknown as { result: typeof describeTypesResponse.data }
  ).result;

  const header = [
    col({
      icon: 'mdi-calendar',
      key: 'event',
      label: 'Event',
      value: () => ({
        display: Input,
        props: {
          type: 'number',
          name: 'event_Id',
          range: { min: 0, max: 10 }
        }
      })
    }),
    col({
      icon: 'mdi:circle',
      key: 'category',
      label: 'Category',
      value: () => ({
        display: Select,
        props: {
          name: 'category',
          options: options.categories?.map((c) => ({ value: c, label: c })) ?? []
        }
      })
    }),
    col({
      icon: '',
      key: 'type',
      label: 'Type',
      value: () => ({
        display: Select,
        props: {
          name: 'type',
          options: options.types?.map((c) => ({ value: c, label: c })) ?? [],
          value: ''
        }
      })
    }),
    col({
      icon: 'mdi:circle',
      key: 'value',
      label: 'Value',
      value: () => ({ display: Input, props: { name: 'value' } })
    }),
    col({
      icon: 'mdi:comment',
      key: 'comment',
      label: 'Comment',
      value: () => ({
        display: Input,
        props: { name: 'comment' }
      })
    }),
    col({
      icon: 'mdi:share',
      key: 'distribution',
      label: 'Distribution',
      value: () => ({
        display: Select,
        props: {
          value: '',
          options: DISTRIBUTION_LOOKUP.map((x, i) => ({
            label: x.text ?? 'unknown',
            value: '' + i
          })),
          name: 'distribution'
        }
      })
    }),
    col({
      icon: 'mdi:circle',
      label: 'Disable Correlation',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'disable_correlation'
        }
      })
    }),
    col({
      icon: 'mdi:flag',
      key: 'to_ids',
      label: 'IDS flag',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'to_ids'
        }
      })
    }),
    col({
      icon: 'mdi:clock-outline',
      key: 'date',
      label: 'Date',
      value: () => ({
        display: Input,
        props: {
          type: 'date'
        }
      })
    }),
    col({
      icon: 'mdi:clock-outline',
      key: 'first_seen',
      label: 'First Sighting',
      value: () => ({
        display: Input,
        props: {
          type: 'date'
        }
      })
    }),
    col({
      icon: 'mdi:clock-outline',
      key: 'last_seen',
      label: 'Last Sighting',
      value: () => ({
        display: InputWithCheckbox,
        props: {
          checked: false,
          inputProps: {
            value: undefined,
            name: 'first_seen',
            type: 'date'
          }
        }
      })
    })
  ];

  return {
    tableData,
    header
  };
};
