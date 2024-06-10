<script lang="ts">
  import { api } from '$lib/api';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import { get } from 'svelte/store';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import { actionBar } from '$lib/actions';

  export let data;

  const Add_Attributes: ActionBarEntryProps[] = [
    {
      icon: 'mdi:plus',
      label: 'Add Attribute',
      action: 'attributes/new'
    }
  ];
</script>

<!--
    @component Displays a list of all attributes. 
    
-->

<svelte:window use:actionBar={Add_Attributes} />

<ComplexTableLayout
  endpoint={(x) => {
    return get(api).POST('/attributes/restSearch', { body: x });
  }}
  {...data}
  dataAccess={(x) => x.response?.Attribute}
  groupInfo={(x) => (x.object_id === '0' ? undefined : `Object: ${x.object_id}`)}
/>
