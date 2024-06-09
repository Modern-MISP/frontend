<script lang="ts">
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import { currentRoute, settings } from '$lib/stores';
  import SettingsEntry from '$lib/components/settingsEntry/SettingsEntry.svelte';
  $currentRoute = [
    {
      name: 'Admin',
      icon: 'mdi:shield-account',
      href: 'admin'
    },
    {
      name: 'Settings',
      icon: 'mdi:cog',
      href: 'settings'
    }
  ];
</script>

<!--
  @component
  Exposes various global settings of the application.
-->

<div class="flex flex-col rounded-lg">
  <SettingsEntry label="Execution of workflows is allowed:">
    <Checkbox bind:checked={$settings.workflowsAllowed} />
  </SettingsEntry>
</div>
