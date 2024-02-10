<script lang="ts">
  import { api } from '$lib/api';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import { get } from 'svelte/store';

  export let data;
</script>

<!--
    @component
    
-->

<ComplexTableLayout
  endpoint={(x) => {
    return get(api).POST('/attributes/restSearch', { body: x });
  }}
  editActions={[]}
  topMenuActions={[]}
  filter={[]}
  {...data}
  pagination={true}
  dataAccess={(x) => x.response?.Attribute}
  groupInfo={(x) => (x.object_id === '0' ? undefined : `Object: ${x.object_id}`)}
/>
