import { GET } from '$lib/api';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';

export const load: PageLoad = async ({ fetch }) => {
  const { data, error: mispError, response } = await GET('/servers', { fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();
  const header = [
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => x.Server?.id ?? 'unknown'
    }),
    col({
      icon: 'mdi:circle',
      key: 'name',
      label: 'Name',
      value: (x) => x.Server?.name ?? 'unknown'
    }),
    col({
      icon: 'mdi:chevron-triple-up',
      key: 'priority',
      label: 'Priority',
      value: (x) => x.Server?.priority ?? 'unknown'
    }),

    //TODO: maybe reference to orf or something like that

    col({
      icon: 'material-symbols:work-outline',
      key: 'remote_org_id',
      label: 'Organization',
      value: (x) => x.Server?.remote_org_id ?? 'unknown'
    }),
    col({
      icon: 'mdi:wifi',
      key: 'url',
      label: 'URL',
      value: (x) => x.Server?.url ?? 'unknown'
    }),
    col({
      icon: 'mdi:home-search-outline',
      key: 'internal',
      label: 'Internal',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.internal ?? false } })
    }),
    col({
      icon: 'mdi:share',
      key: 'push',
      label: 'Push',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.push ?? false } })
    }),
    col({
      icon: 'mdi:share',
      key: 'pull',
      label: 'Pull',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.pull ?? false } })
    }),
    col({
      icon: 'mdi:eye',
      key: 'push_sightings',
      label: 'Push Sightings',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.push_sightings ?? false } })
    }),
    col({
      icon: 'streamline:galaxy-2-solid',
      key: 'push_galaxy_cluster',
      label: 'Push Cluster',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.Server?.push_galaxy_clusters ?? false }
      })
    }),
    col({
      icon: 'mdi:cached',
      key: 'caching_enabled',
      label: 'Cache',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.caching_enabled ?? false } })
    }),
    col({
      icon: 'mdi:share-all',
      key: 'unpublish_event',
      label: 'Unpublish Event',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.unpublish_event ?? false } })
    }),
    col({
      icon: 'mdi:email-outline',
      key: 'publish_without_email',
      label: 'Publish without E-Mail',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.Server?.publish_without_email ?? false }
      })
    }),
    col({
      icon: 'mdi:id-card',
      key: 'self_signed',
      label: 'Self Signed',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.self_signed ?? false } })
    }),
    col({
      icon: 'mdi:link',
      key: 'skip_proxy',
      label: 'Skip Proxy',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.skip_proxy ?? false } })
    }),

    //TODO: not implemented desired function yet
    col({
      icon: 'mdi:link',
      key: 'explore_event_graph',
      label: 'Explore Event Graph',
      value: () => ({
        display: HrefPill,
        props: {
          text: 'click to see events',
          href: `/events/`
        }
      })
    })
  ];

  return {
    data,
    tableData: data,
    header
  };
};
