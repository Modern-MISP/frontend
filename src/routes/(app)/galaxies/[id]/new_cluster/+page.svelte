<script lang="ts">
  import { page } from '$app/stores';
  import { api } from '$lib/api';
  import Form from '$lib/components/form/Form.svelte';
  import { get } from 'svelte/store';
  import KeyValueEditor from '$lib/components/keyValueEditor/KeyValueEditor.svelte';
  import { notifySave } from '$lib/util/notifications.util';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import type { components } from '$lib/api/misp';
  import Input from '$lib/components/input/Input.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import Picker from '$lib/components/picker/Picker.svelte';
  import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
  import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';
  import Select from '$lib/components/form/Select.svelte';
  import { goto } from '$app/navigation';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { currentRoute, mode } from '$lib/stores';
  import { lockEditMode } from '$lib/actions';

  $: $currentRoute = [
    ...($currentRoute ?? []),
    { name: 'New Galaxy Cluster', href: 'new_cluster', icon: 'carbon:assembly-cluster' }
  ];

  $mode = 'edit';

  let entries: [string, string][] = [];

  function editCallback(formData: Record<string, string>) {
    notifySave(
      get(api)
        .POST('/galaxy_clusters/add/{galaxyId}', {
          params: { path: { galaxyId: $page.params.id } },
          body: {
            ...formData,
            GalaxyElement: entries.map(([key, value]) => ({
              key,
              value
            }))
          }
        })
        .then((resp) => {
          if (resp.error) {
            throw new Error(resp.error.message);
          } else {
            goto(`/galaxies/clusters/${resp.data.GalaxyCluster?.id}`);
          }
        })
    );
  }

  const col = createTableHeadGenerator<components['schemas']['GalaxyCluster']>();
  const header = [
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
            name: 'value',
            required: true
          }
        })
      }
    ),
    col(
      {
        label: 'Description',
        value: (x) => x?.description ?? ''
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
    col(
      {
        label: 'Distribution',
        value: (x) => ({
          display: LookupPill,
          props: {
            value: +(x?.distribution ?? 0),
            options: DISTRIBUTION_LOOKUP
          }
        })
      },
      {
        value: (x) => ({
          display: Select,
          props: {
            value: '' + (x?.distribution ?? 0),
            options: DISTRIBUTION_LOOKUP.slice(0, 4).map((x, i) => ({
              label: x.text ?? 'unknown',
              value: '' + i
            })),
            name: 'distribution'
          }
        })
      }
    )
  ];
</script>

<svelte:window use:lockEditMode={true} />

<Form callback={editCallback}>
  <DynCard {header} data={{}}></DynCard>
</Form>

<KeyValueEditor bind:entries></KeyValueEditor>
