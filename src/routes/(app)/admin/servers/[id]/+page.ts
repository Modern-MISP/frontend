import { api } from '$lib/api';
import { genSelectProps } from '$lib/util/select.util';
import { error, type NumericRange } from '@sveltejs/kit';
import { filter } from 'lodash-es';
import { get } from 'svelte/store';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Input from '$lib/components/input/Input.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';

import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import Select from '$lib/components/form/Select.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

export const load = async ({ params, fetch }) => {
  const { data, error: mispError, response } = await get(api).GET('/servers', { fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const server = filter(data, (x) => x.Server!.id === params.id).at(0) ?? {};
  const col = createTableHeadGenerator<typeof server>();

  const { data: orgs } = await get(api).GET('/organisations', { fetch });
  const orgOptions = orgs?.map((x) => x.Organisation);

  const left = [
    col({
      key: 'id',
      label: 'ID',
      value: (x) => x.Server?.id ?? 'unknown'
    }),
    col(
      {
        key: 'name',
        label: 'Name',
        value: (x) => x.Server?.name ?? 'unknown'
      },
      {
        value: (x) => ({
          display: Input,
          props: { value: x.Server?.name ?? 'unknown', name: 'name' }
        })
      }
    ),
    col(
      {
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
      },
      {
        value: (x) => ({
          display: Input,
          props: { value: x.Server?.url ?? 'unknown', name: 'url' }
        })
      }
    ),
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
    col(
      {
        label: 'Organization',
        value: (x) => ({
          display: Pill,
          props: {
            icon: 'material-symbols:work-outline',
            label: x.Server?.org_id ?? 'unknown',
            text: x.Organisation?.name ?? 'unknown'
          }
        })
      },
      {
        value: () => ({
          display: Select,
          props: {
            ...genSelectProps(orgOptions),
            name: 'org_id'
          }
        })
      }
    ),
    col(
      {
        label: 'Remote Organization',
        value: (x) => ({
          display: Pill,
          props: {
            icon: 'material-symbols:work-outline',
            label: x.Server?.remote_org_id ?? 'unknown',
            text: x.RemoteOrg?.name ?? 'unknown'
          }
        })
      },
      {
        // TODO: search if valid org? => Should use a select. But don't know the endpoint for remote orgs
        value: (x) => ({
          display: Input,
          props: { value: x.Server?.remote_org_id, name: 'remote_org_id' }
        })
      }
    ),

    col(
      {
        key: 'authkey',
        label: 'Auth Key',
        value: () => 'not shown'
      },
      {
        value: () => ({
          display: Input,
          props: { value: '', placeholder: 'set new auth key', name: 'authkey' }
        })
      }
    )
  ];
  const right = [
    col({
      key: 'internal',
      label: 'Internal',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.internal ?? false } })
    }),
    col(
      {
        key: 'push',
        label: 'Push',
        value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.push ?? false } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'push', checked: x.Server?.push ?? false }
        })
      }
    ),
    col(
      {
        key: 'pull',
        label: 'Pull',
        value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.pull ?? false } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'pull', checked: x.Server?.pull ?? false }
        })
      }
    ),
    col(
      {
        key: 'push_sightings',
        label: 'Push Sightings',
        value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.push_sightings ?? false } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'push_sightings', checked: x.Server?.push_sightings ?? false }
        })
      }
    ),
    col(
      {
        key: 'caching_enabled',
        label: 'Cache',
        value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.caching_enabled ?? false } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'caching_enabled', checked: x.Server?.caching_enabled ?? false }
        })
      }
    ),
    col(
      {
        key: 'push_galaxy_clusters',
        label: 'Push Cluster',
        value: (x) => ({
          display: Boolean,
          props: { isTrue: x.Server?.push_galaxy_clusters ?? false }
        })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'push_galaxy_clusters', checked: x.Server?.push_galaxy_clusters ?? false }
        })
      }
    ),
    col(
      {
        key: 'pull_galaxy_clusters',
        label: 'Pull Cluster',
        value: (x) => ({
          display: Boolean,
          props: { isTrue: x.Server?.pull_galaxy_clusters ?? false }
        })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'pull_galaxy_clusters', checked: x.Server?.pull_galaxy_clusters ?? false }
        })
      }
    ),
    col(
      {
        key: 'unpublish_event',
        label: 'Unpublish Event',
        value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.unpublish_event ?? false } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'unpublish_event', checked: x.Server?.unpublish_event ?? false }
        })
      }
    ),
    col(
      {
        key: 'publish_without_email',
        label: 'Publish without email',
        value: (x) => ({
          display: Boolean,
          props: { isTrue: x.Server?.publish_without_email ?? false }
        })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: {
            name: 'publish_without_email',
            checked: x.Server?.publish_without_email ?? false
          }
        })
      }
    ),
    col(
      {
        key: 'self_signed',
        label: 'Allow self signed certificates',
        value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.self_signed ?? false } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'self_signed', checked: x.Server?.self_signed ?? false }
        })
      }
    ),
    col(
      {
        key: 'skip_proxy',
        label: 'Skip Proxy',
        value: (x) => ({ display: Boolean, props: { isTrue: x.Server?.skip_proxy ?? false } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'skip_proxy', checked: x.Server?.skip_proxy ?? false }
        })
      }
    ),
    col(
      {
        key: 'remove_missing_tags',
        label: 'Remove missing attribute tags',
        value: (x) => ({
          display: Boolean,
          // @ts-expect-error Not in the OpenAPI spec.
          props: { isTrue: x.Server?.remove_missing_tags ?? false }
        })
      },
      {
        value: (x) => ({
          display: Checkbox,

          // @ts-expect-error Not in the OpenAPI spec.
          props: { name: 'remove_missing_tags', checked: x.Server?.remove_missing_tags ?? false }
        })
      }
    )
  ];

  return {
    server,
    left,
    right
  };
};
