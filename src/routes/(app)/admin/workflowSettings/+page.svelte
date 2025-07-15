<script lang="ts">
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import SettingsEntry from '$lib/components/settingsEntry/SettingsEntry.svelte';
  import { api } from '$lib/api';
  import { get } from 'svelte/store';

  let { data = $bindable() } = $props();

  function onchange() {
    //@ts-expect-error Not in Openapi spec.
    get(api).POST(`/workflows/toggleWorkflows/${data.data}`, { fetch });
  }
</script>

<!--
  @component
  Represents a menu for admin-right restricted settings regarding workflows

  - Contains a toggle-switch which allows for enabling/disabling workflows globally
-->

<div class="flex flex-col rounded-lg">
  <SettingsEntry label="Execution of workflows is allowed:">
    <Checkbox bind:checked={data.data} on:change={onchange} />
  </SettingsEntry>
</div>
