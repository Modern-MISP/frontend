import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
import Info from '$lib/components/info/Info.svelte';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import type { components } from '$lib/api/misp';
import type { TableHead } from '$lib/models/TableHead.interface';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import Select from '$lib/components/form/Select.svelte';
import Input from '$lib/components/input/Input.svelte';
import { shouldTextBeBlack } from '$lib/util/color.util';

export const editAttributeCols = (
  options: components['schemas']['DescribeAttributeTypesResponse'],
  selectedCategory: string | undefined = undefined // TODO: idk where/how to get this
) =>
  ({
    distribution: {
      value: (x) => ({
        display: Select,
        props: {
          value: (x?.distribution ?? 1).toString(),
          options: DISTRIBUTION_LOOKUP.map((d, i) => ({
            value: i.toString(),
            label: d.text!
          }))
        },
        name: 'distribution'
      })
    },
    category: {
      value: () => ({
        display: Select,
        props: {
          name: 'category',
          options: options.categories?.map((c) => ({ value: c, label: c })) ?? []
        }
      })
    },
    type: {
      value: () => ({
        display: Select,
        props: {
          name: 'type',
          // use types that are associated with selected category, if possible
          options:
            (
              (selectedCategory
                ? (options.category_type_mappings ?? {})[selectedCategory]
                : undefined) ?? options.types
            )?.map((t) => ({ value: t, label: t })) ?? []
        }
      })
    },
    comment: {
      value: (x) => ({
        display: Input,
        props: {
          name: 'comment',
          value: x?.comment ?? ''
        }
      })
    },
    value: {
      value: (x) => ({
        display: Input,
        props: {
          name: 'value',
          value: x?.value ?? ''
        }
      })
    }
  }) satisfies Record<
    string,
    Partial<TableHead<components['schemas']['Attribute']> & DynTableHeadExtent>
  >;
