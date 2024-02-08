import { GET } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { filter } from 'lodash-es';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';

export const load = async ({ params, fetch }) => {
  const { data, error: mispError, response } = await GET('/servers', { fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const server = filter(data, (x) => x.Server!.id === params.id).at(0) ?? {};

  const col = createTableHeadGenerator<typeof server>();

  const left = [
    col({
      key: 'id',
      label: 'ID',
      value: (x) => x.Server?.id ?? 'unknown'
    }),
    col({
      key: 'name',
      label: 'Name',
      value: (x) => x.Server?.name ?? 'unknown'
    }),
    col({
      key: 'priority',
      label: 'Priority',
      value: (x) => ({
        display: Pill,
        props: {
          icon: 'mdi:chevron-triple-up',
          text: x.Server?.priority ?? 'unknown'
        }
      })
    }),
    col({
      label: 'Organization',
      value: (x) => ({
        display: Pill,
        props: {
          icon: 'material-symbols:work-outline',
          label: x.Server?.org_id ?? 'unknown',
          text: x.Organisation?.name ?? 'unknown'
        }
      })
    }),
    col({
      label: 'Remote Organization',
      value: (x) => ({
        display: Pill,
        props: {
          icon: 'material-symbols:work-outline',
          label: x.Server?.remote_org_id ?? 'unknown',
          text: x.RemoteOrg?.name ?? 'unknown'
        }
      })
    }),
    col({
      key: 'url',
      label: 'URL',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'ri:share-box-line',
          href: x.Server?.url ?? '#',
          target: '_blank' as const,
          text: x.Server?.url ?? 'unknown'
        }
      })
    }),
    col({
      key: 'cache_timestamp',
      label: 'Cache date',
      value: (x) => ({
        display: DatePill,
        props: {
          date: x.Server?.cache_timestamp ? new Date(+x.Server.cache_timestamp * 1000) : null,
          onNullText: 'unknown'
        }
      })
    }),

    //TODO: not implemented desired function yet
    col({
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
  const right = [
    col({
      key: 'internal',
      label: 'Internal',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.internal ?? false } })
    }),
    col({
      key: 'push',
      label: 'Push',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.push ?? false } })
    }),
    col({
      key: 'pull',
      label: 'Pull',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.pull ?? false } })
    }),
    col({
      key: 'push_sightings',
      label: 'Push Sightings',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.push_sightings ?? false } })
    }),
    col({
      key: 'push_galaxy_cluster',
      label: 'Push Cluster',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.Server?.push_galaxy_clusters ?? false }
      })
    }),
    col({
      key: 'caching_enabled',
      label: 'Cache',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.caching_enabled ?? false } })
    }),
    col({
      key: 'unpublish_event',
      label: 'Unpublish Event',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.unpublish_event ?? false } })
    }),
    col({
      key: 'publish_without_email',
      label: 'Publish without E-Mail',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.Server?.publish_without_email ?? false }
      })
    }),
    col({
      key: 'self_signed',
      label: 'Self Signed',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.self_signed ?? false } })
    }),
    col({
      key: 'skip_proxy',
      label: 'Skip Proxy',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.skip_proxy ?? false } })
    })
  ];

  return {
    server,
    left,
    right
  };
};
