<script lang="ts">
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import SettingsEntry from '$lib/components/settingsEntry/SettingsEntry.svelte';
  import { api } from '$lib/api';
  import { get } from 'svelte/store';

  $: state = get(api).GET('/workflows/workflowsSetting', { fetch });
</script>

<!--
  @component
  Represents a menu for admin-right restricted settings regarding workflows

  - Contains a toggle-switch which allows for enabling/disabling workflows globally
-->

<div class="flex flex-col rounded-lg">
  <SettingsEntry label="Execution of workflows is allowed:">
    <Checkbox
      bind:checked={state}
      on:change={(get(api).POST(`/workflows/toggleWorkflows/${state}`), { fetch })}
    />
  </SettingsEntry>
</div>
