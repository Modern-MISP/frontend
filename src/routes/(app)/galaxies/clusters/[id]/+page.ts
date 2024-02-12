import { api } from '$lib/api';
import { get } from 'svelte/store';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from '../../[id]/$types';

import Info from '$lib/components/info/Info.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import type { paths } from '$lib/api/misp';
import Input from '$lib/components/input/Input.svelte';
import Picker from '$lib/components/picker/Picker.svelte';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await get(api).GET('/galaxy_clusters/view/{galaxyClusterId}', {
    params: { path: { galaxyClusterId: params.id } },
    fetch
  });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  /**
   * Editable properties according to OpenAPI spec:
   * - [ ] GalaxyElement
   * - [x] authors
   * - [ ] collection_uuid
   * - [x] default
   * - [ ] deleted
   * - [ ] description
   * - [x] distribution
   * - [ ] extends_uuid
   * - [ ] extends_version
   * - [ ] galaxy_id
   * - [x] id
   * - [ ] locked
   * - [ ] org_id
   * - [ ] orgc_id
   * - [ ] published
   * - [ ] sharing_group_id
   * - [x] source
   * - [ ] tag_name
   * - [x] type
   * - [x] uuid
   * - [x] value
   * - [x] version
   */
  const col = createTableHeadGenerator<(typeof data)['GalaxyCluster']>();
  const leftCardHeader = [
    col(
      {
        label: 'Value',
        value: (x) => x?.value ?? 'unknown'
      },
      {
        value: (x) => ({
          display: Input,
          props: {
            value: x?.value,
            name: 'value'
          }
        })
      }
    ),
    col(
      {
        label: 'Description',
        value: (x) => x?.description ?? 'unknown'
      },
      {
        value: (x) => ({
          display: Input,
          props: {
            value: x?.description,
            name: 'description'
          }
        })
      }
    ),
    col(
      {
        label: 'Type',
        value: (x) => x?.type ?? 'unknown'
      },
      {
        value: (x) => ({
          display: Input,
          props: {
            value: x?.type,
            name: 'type'
          }
        })
      }
    ),
    col({
      label: 'Parent Galaxy',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'streamline:galaxy-2-solid',
          label: x?.galaxy_id ?? 'unknown',
          text: x?.Galaxy?.name,
          href: `/galaxies/${x?.galaxy_id}`
        }
      })
    }),
    col(
      {
        label: 'Source',
        value: (x) => x?.source ?? 'unknown'
      },
      {
        value: (x) => ({
          display: Input,
          props: {
            value: x?.source,
            name: 'source'
          }
        })
      }
    ),
    col(
      {
        label: 'Authors',
        value: (x) => ({
          display: PillCollection,
          props: {
            pills:
              x?.authors?.map((a) => ({ icon: 'streamline:user-circle-single', text: a })) ?? [],
            class: 'pl-4'
          }
        })
      },
      {
        value: (x) => ({
          display: Picker,
          props: {
            name: 'authors',
            pickedItems: x?.authors?.map((a) => ({
              value: a,
              text: a,
              icon: 'streamline:user-circle-single'
            })),
            arbitraryInput: (a: string) => ({
              icon: 'streamline:user-circle-single',
              text: a,
              value: a
            })
          }
        })
      }
    ),
    col({
      label: 'Events',
      value: (x) => x?.tag_count?.toString() ?? 'unknown'
    }),
    col({
      label: 'Tag',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:tag',
          label: x?.tag_id ?? 'unknown',
          text: x?.tag_name ?? 'unknown',
          href: x?.tag_id ? '/tags/' + x.tag_id : '#'
        }
      })
    })
  ];
  const rightCardHeader = [
    col(
      {
        label: 'Version',
        value: (x) => x?.version ?? 'unknown'
      },
      {
        value: (x) => ({
          display: Input,
          props: {
            value: x?.version ?? undefined,
            name: 'version'
          }
        })
      }
    ),
    col(
      {
        label: 'ID',
        value: (x) => x?.id ?? 'unknown'
      },
      {
        value: (x) => ({
          display: Input,
          props: {
            value: x?.id,
            name: 'id'
          }
        })
      }
    ),
    col(
      {
        label: 'UUID',
        value: (x) => x?.uuid ?? 'unknown'
      },
      {
        value: (x) => ({
          display: Input,
          props: {
            value: x?.uuid,
            name: 'uuid'
          }
        })
      }
    ),
    col({
      label: 'Collection UUID',
      value: (x) => x?.collection_uuid ?? 'unknown'
    }),
    col({
      label: 'Organizations',
      value: (x) => ({
        display: PillCollection,
        props: {
          pills: [
            {
              icon: 'mdi:home',
              label: 'Owner',
              text: x?.Org?.name
            },
            {
              icon: 'mdi:creation',
              label: 'Creator',
              text: x?.Orgc?.name
            }
          ]
        }
      })
    }),
    col({
      label: 'Distribution',
      value: (x) => ({
        display: LookupPill,
        props: {
          value: +(x?.distribution ?? 0),
          options: DISTRIBUTION_LOOKUP
        }
      })
    }),
    col(
      {
        label: 'Default',
        value: (x) => ({
          display: Boolean,
          props: {
            isTrue: x?.default
          }
        })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { checked: x?.default ?? false, name: 'default' }
        })
      }
    )
  ];

  const galaxyElements = data.GalaxyCluster?.GalaxyElement ?? [];
  const col2 = createTableHeadGenerator<(typeof galaxyElements)[number], DynTableHeadExtent>();
  const elementsHeader = [
    col2({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.id ?? 'unknown' }),
    col2({
      icon: 'mdi:key',
      key: 'key',
      label: 'key',
      value: (x) => ({
        display: Info,
        props: {
          text: x.key
        }
      })
    }),
    col2({
      icon: 'mdi:circle',
      key: 'value',
      label: 'Value',
      value: (x) => ({
        display: Info,
        props: { text: x.value }
      })
    })
  ];

  return {
    cardData: data.GalaxyCluster,
    leftCardHeader,
    rightCardHeader,
    tableData: galaxyElements,
    tableHeader: elementsHeader
  };
};
