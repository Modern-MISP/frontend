import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import Input from '$lib/components/input/Input.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import Info from '$lib/components/info/Info.svelte';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';
import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
import Select from '$lib/components/form/Select.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { components } from '$lib/api/misp';
import { shouldTextBeBlack } from '$lib/util/color.util';
import { format } from 'date-fns';

export const load = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await get(api).GET('/attributes/view/{attributeId}', {
    params: { path: { attributeId: params.id } },
    fetch
  });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const tableData = data.Attribute ?? {};

  console.log(data);
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

  const left = [
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => x.id ?? 'unknown'
    }),
    col({
      icon: 'mdi-calendar',
      key: 'event',
      label: 'Event',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi-calendar',
          text: x.event_id!,
          href: `/events/${x.event_id}`
        }
      })
    }),
    col(
      {
        icon: 'mdi:circle',
        key: 'category',
        label: 'Category',
        value: (x) => ({
          display: Pill,
          props: {
            text: x.category
          }
        })
      },
      {
        value: (x) => ({
          display: Select,
          props: {
            name: 'category',
            options: options.categories?.map((c) => ({ value: c, label: c })) ?? [],
            value: x.category ?? ''
          }
        })
      }
    ),
    col(
      {
        icon: '',
        key: 'type',
        label: 'Type',
        value: (x) => x.type ?? ''
      },
      {
        //TODO: options dependent on select category
        value: (x) => ({
          display: Select,
          props: {
            name: 'type',
            options: options.types?.map((c) => ({ value: c, label: c })) ?? [],
            value: x.type ?? ''
          }
        })
      }
    ),
    col(
      {
        icon: 'mdi:circle',
        key: 'value',
        label: 'Value',
        value: (x) => ({
          display: Info,
          props: { text: x.value, class: 'max-w-xs overflow-hidden text-ellipsis' }
        })
      },
      {
        value: (x) => ({ display: Input, props: { value: x.value ?? 'unknown' } })
      }
    ),
    col(
      {
        icon: 'mdi:comment',
        key: 'comment',
        label: 'Comment',
        value: (x) => x?.comment ?? 'text'
      },
      {
        value: (x) => ({ display: Input, props: { value: x?.comment ?? 'unknown' } })
      }
    ),
    col(
      {
        icon: 'mdi:share',
        key: 'distribution',
        label: 'Distribution',
        value: (x) => ({
          display: LookupPill,
          props: {
            value: +(x.distribution ?? 0),
            options: DISTRIBUTION_LOOKUP
          }
        })
      },
      {
        value: (x) => ({
          display: Select,
          props: {
            value: '' + (x?.distribution ?? 1),
            options: DISTRIBUTION_LOOKUP.map((x, i) => ({
              label: x.text ?? 'unknown',
              value: '' + i
            })),
            name: 'distribution'
          }
        })
      }
    )
  ];
  const right = [
    col(
      {
        icon: 'mdi:circle',
        key: 'disable_correlation',
        label: 'Correlate',
        value: (x) => ({ display: Boolean, props: { isTrue: !x.disable_correlation } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: {
            checked: !x.disable_correlation,
            name: 'correlate'
          }
        })
      }
    ),
    col(
      {
        icon: 'mdi:flag',
        key: 'to_ids',
        label: 'IDS flag',
        value: (x) => ({ display: Boolean, props: { isTrue: x.to_ids } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: {
            checked: x?.to_ids ?? false,
            name: 'to_ids'
          }
        })
      }
    ),
    col(
      {
        icon: 'mdi:clock-outline',
        key: 'date',
        label: 'Date',
        value: (x) => ({
          display: DatePill,
          props: {
            date: x.timestamp ? new Date(+x.timestamp * 1000) : new Date()
          }
        })
      },
      {
        value: (x) => ({
          display: Input,
          props: {
            value: x?.timestamp ? format(new Date(+x.timestamp * 1000), 'yyyy-MM-dd') : undefined,
            name: 'date',
            type: 'date'
          }
        })
      }
    ),
    col(
      {
        icon: 'mdi:clock-outline',
        key: 'first_seen',
        label: 'First Sighting',
        value: (x) => ({
          display: DatePill,
          props: {
            date: x.first_seen ? new Date(+x.first_seen || 0) : null,
            onNullText: 'no sighting'
          }
        })
      },
      {
        value: (x) => ({
          display: Input,
          props: {
            value: x?.first_seen ? format(new Date(+x.first_seen * 1000), 'yyyy-MM-dd') : undefined,
            name: 'first_seen',
            type: 'date'
          }
        })
      }
    ),
    col(
      {
        icon: 'mdi:clock-outline',
        key: 'last_seen',
        label: 'Last Sighting',
        value: (x) => ({
          display: DatePill,
          props: {
            date: x.last_seen ? new Date(+x.last_seen || 0) : null,
            onNullText: 'no sighting'
          }
        })
      },
      {
        value: (x) => ({
          display: Input,
          props: {
            value: x?.last_seen ? format(new Date(+x.last_seen * 1000), 'yyyy-MM-dd') : undefined,
            name: 'last:seen',
            type: 'date'
          }
        })
      }
    ),
    col({
      icon: 'mdi:tag',
      key: 'tags',
      label: 'Tags',
      value: (x) => ({
        display: PillCollection,
        props: {
          pills: (x.Tag ?? []).map((y) => ({
            icon: y.local ? 'mdi:cloud-off-outline' : 'mdi:earth',
            label: y.relationship_type ? y.relationship_type : undefined,
            text: y.name,
            style: `background-color: ${y.colour}; color: ${
              shouldTextBeBlack(y.colour!) ? 'black' : 'white'
            }`
          }))
        }
      })
    })
    //sightings
  ];

  return {
    user: data,
    left,
    right
  };
};
