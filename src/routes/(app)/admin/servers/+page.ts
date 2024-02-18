import { api } from '$lib/api';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

import { invalidateAll } from '$app/navigation';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { notifications } from '$lib/stores';
import { errorPill, successPill } from '$lib/util/pill.util';

export const load: PageLoad = async ({ fetch }) => {
  const { data, error: mispError, response } = await get(api).GET('/servers', { fetch });

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
      icon: 'mdi:wifi',
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
      icon: 'mdi:chevron-triple-up',
      key: 'priority',
      label: 'Priority',
      value: (x) => x.Server?.priority ?? 'unknown'
    }),
    col({
      icon: 'material-symbols:work-outline',
      key: 'org_id',
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
      icon: 'material-symbols:work-outline',
      key: 'remote_org_id',
      label: 'Remote Org',
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
      icon: 'mdi:home-search-outline',
      key: 'internal',
      label: 'Internal',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.internal ?? false } })
    }),
    col({
      icon: 'mdi:upload',
      key: 'push',
      label: 'Push',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.push ?? false } })
    }),
    col({
      icon: 'mdi:download',
      key: 'pull',
      label: 'Pull',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.pull ?? false } })
    }),
    col({
      icon: 'mdi:eye-outline',
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
      icon: '',
      key: 'unpublish_event',
      label: 'Unpublish Event',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.unpublish_event ?? false } })
    }),
    col({
      icon: 'mdi:email-outline',
      key: 'publish_without_email',
      label: 'Publish without email',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.Server?.publish_without_email ?? false }
      })
    }),
    col({
      icon: '',
      key: 'self_signed',
      label: 'Self Signed',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.self_signed ?? false } })
    }),
    col({
      icon: 'mdi:link',
      key: 'skip_proxy',
      label: 'Skip Proxy',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.skip_proxy ?? false } })
    })
  ];

  const topMenuActions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:server-add',
      label: 'Add Server',
      action: '/admin/servers/new'
    }
  ];

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Delete Server',
      icon: 'mdi:delete-outline',
      class: 'text-red',
      action: (x) => {
        Promise.all(
          x
            .map((y) => y.Server?.id)
            .map((serverId) =>
              get(api).POST('/servers/delete/{serverId}', {
                fetch,
                params: { path: { serverId: serverId as string } }
              })
            )
        ).then(invalidateAll);
      }
    },
    {
      label: 'Sync with local events',
      icon: 'mdi:sync',
      action: (x) => {
        // TODO: add a endpoint if found.
        notifications.add(
          errorPill('Do not know the endpoint. Sync all: ' + x.map((y) => y.Server?.id).join())
        );
      }
    },
    {
      label: 'Pull all',
      icon: 'mdi:download',
      action: (x) => {
        // TODO: add a endpoint if found.
        notifications.add(
          errorPill('Do not know the endpoint. Pull all: ' + x.map((y) => y.Server?.id).join())
        );
      }
    },
    {
      label: 'Push all',
      icon: 'mdi:upload',
      // TODO: add a endpoint if found.
      action: (x) => {
        notifications.add(
          errorPill('Do not know the endpoint. Push all: ' + x.map((y) => y.Server?.id).join())
        );
      }
    },
    {
      label: 'Cache instance',
      icon: 'octicon:cache-16',
      action: (x) => {
        Promise.all(
          x
            .map((y) => y.Server?.id)
            .map((serverId) =>
              // @ts-expect-error Not in the OpenAPI spec.. great. Don't even know if the endpoint works...
              get(api).POST('/servers/cache/{serverId}', {
                fetch,
                params: { path: { serverId: serverId as string } }
              })
            )
        ).then(() => {
          notifications.add(successPill('Cached instance: ' + x.map((y) => y.Server?.id)));
          invalidateAll();
        });
      }
    },
    {
      label: 'Increase priority',
      icon: 'iconoir:priority-up',
      action: (x) => {
        // TODO: add a endpoint if found.
        notifications.add(
          errorPill('Do not know the endpoint. increase prio:' + x.map((y) => y.Server?.id).join())
        );
      }
    },
    {
      label: 'Decrease priority',
      icon: 'iconoir:priority-down',
      action: (x) => {
        notifications.add(
          errorPill('Do not know the endpoint. decrease prio: ' + x.map((y) => y.Server?.id).join())
        );
      }
    },
    {
      label: 'Test connection',
      icon: 'mdi:connection',
      action: (x) => {
        // TODO: add a endpoint if found.
        notifications.add(
          errorPill(
            'Do not know the endpoint. test connection: ' + x.map((y) => y.Server?.id).join()
          )
        );
      }
    },
    {
      label: 'Reset api key',
      icon: 'fluent:key-reset-20-regular',
      action: (x) => {
        // TODO: add a endpoint if found.
        notifications.add(
          errorPill('Do not know the endpoint. reset api key: ' + x.map((y) => y.Server?.id).join())
        );
      }
    }
  ];
  return {
    data,
    tableData: data,
    header,
    topMenuActions,
    editActions
  };
};
