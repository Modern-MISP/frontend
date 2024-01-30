<script lang="ts">
  import { actionBar } from '$lib/actions';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  const actions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:close-circle-outline',
      label: 'Abbrechen',
      action: '/events'
    },
    {
      icon: 'material-symbols:save-outline',
      label: 'Save',
      class: 'text-green',
      action: () => {}
    }
  ];
</script>

<svelte:window use:actionBar={actions} />
