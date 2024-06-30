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
  Represents a menu for admin-right restricted settings regarding workflows

  - Contains a toggle-switch which allows for enabling/disabling workflows globally
-->

<div class="flex flex-col rounded-lg">
  <SettingsEntry label="Execution of workflows is allowed:">
    <Checkbox bind:checked={$settings.workflowsAllowed} />
  </SettingsEntry>
</div>
