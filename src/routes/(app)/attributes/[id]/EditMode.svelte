<script lang="ts">
  import { actionBar } from '$lib/actions';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';

  const actions: ActionBarEntryProps[] = [
    {
      icon: 'material-symbols:save-outline',
      label: 'Save',
      action: () => {
        //TODO: body
      }
    },
    {
      icon: 'mdi:exit-to-app',
      label: 'Exit',
      action: () => {
        //TODO: body
      }
    }
  ];
</script>

<svelte:window use:actionBar={actions} />
<form>
  <slot />
</form>
