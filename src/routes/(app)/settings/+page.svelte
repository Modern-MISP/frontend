<script lang="ts">
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import Select from '$lib/components/form/Select.svelte';
  import { currentRoute, settings, themes } from '$lib/stores';
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
  <SettingsEntry label="Menu is open per default">
    <Checkbox bind:checked={$settings.openOnInit} />
  </SettingsEntry>
  <SettingsEntry label="Table Max Width">
    <Checkbox bind:checked={$settings.tableMaxSize} />
  </SettingsEntry>
  <SettingsEntry label="Theme">
    <Select options={themes} bind:value={$settings.theme} />
  </SettingsEntry>
</div>
