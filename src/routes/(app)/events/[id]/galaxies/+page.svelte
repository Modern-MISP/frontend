<script lang="ts">
  import AddTagForm from '$lib/components/tagForms/AddTagForm.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import EventInfo from '../_components/EventInfo.svelte';
  import EventGalaxies from '../_components/EventGalaxies.svelte';
  import type { EventState } from '../_components/EventState.interface';

  /**
   *
   */
  export let data;
  let state: EventState = 'info';

  let selection: PickerPill[] = [];
  function addTags(x: any) {}
</script>

<EventInfo {data} bind:state>
  <svelte:fragment slot="add">
    <AddTagForm
      bind:selection
      on:createTag={() => (state = 'create')}
      on:close={() => (state = 'info')}
      on:add={({ detail }) => addTags(detail)}
    />
  </svelte:fragment>

  <EventGalaxies bind:state {data} bind:selection />
</EventInfo>
