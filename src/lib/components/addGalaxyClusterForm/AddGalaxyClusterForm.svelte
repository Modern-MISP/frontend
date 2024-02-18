<script lang="ts">
  import { api } from '$lib/api';
  import type { components } from '$lib/api/misp';
  import Card from '$lib/components/card/Card.svelte';
  import CardRow from '$lib/components/card/CardRow.svelte';
  import CheckBox from '$lib/components/checkbox/Checkbox.svelte';
  import Select from '$lib/components/form/Select.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { notifications } from '$lib/stores';
  import { errorPill } from '$lib/util/pill.util';
  import { TAG_RELATION_TYPES } from '../../consts/relationTypes';
  import CardHeading from '../card/CardHeading.svelte';
  import Picker from '../picker/Picker.svelte';

  /**
   * The tags that can be picked.
   */
  export let selection: PickerPill<{ local_only: boolean; relation: string }>[] = [];

  /**
   * The relation of the tags.
   */
  export let relation = TAG_RELATION_TYPES[0];

  let pickedItems: PickerPill[] = [];

  $: selection = pickedItems.map((x) => ({
    ...x,
    icon: local_only ? 'mdi:cloud-off-outline' : 'mdi:earth',
    label: relation !== 'Unspecified' ? relation : undefined,
    local_only,
    relation
  }));

  /**
   * If the tags should be local only.
   */
  export let local_only = false;

  let galaxies: components['responses']['GalaxyListResponse']['content']['application/json'] = [];

  $api.GET('/galaxies').then((res) => {
    if (res.error) return notifications.add(errorPill('failed loading organizations'));
    galaxies = res.data;
    if (galaxies.length > 0) currentGalaxyId = galaxies[0].Galaxy?.id ?? '';
  });

  let cluster: PickerPill[] = [];

  $: $api
    .GET('/galaxy_clusters/index/{galaxyId}', {
      params: {
        path: {
          galaxyId: currentGalaxyId
        }
      }
    })
    .then((res) => {
      if (res.data)
        cluster = res.data?.map((x) => ({
          value: x.GalaxyCluster?.id,
          text: x.GalaxyCluster?.value
        }));
    });

  let currentGalaxyId = '';
</script>

<div class="flex flex-col gap-1">
  <Card>
    <CardHeading>Add Galaxy Cluster</CardHeading>

    <CardRow>
      <span>Local only</span>
      <CheckBox name="local_only" bind:checked={local_only} />
    </CardRow>
    <CardRow>
      <span>Relationship</span>
      <Select
        bind:value={relation}
        options={TAG_RELATION_TYPES.map((x) => ({ label: x, value: x }))}
        name="restrict_org"
      />
    </CardRow>
    <CardRow>
      <span>Galaxy</span>
      <Select
        options={galaxies.map((x) => ({
          label: x.Galaxy?.name ?? 'unknown',
          value: x.Galaxy?.id ?? ''
        }))}
        bind:value={currentGalaxyId}
      />
    </CardRow>
    <Picker placeholder="Cluster" bind:pickedItems on:formValue pickableItems={cluster}></Picker>
  </Card>
</div>
