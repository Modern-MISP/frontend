<script>
	import { settings, themes } from '$lib/stores';
	import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
	import Select from '$lib/components/form/Select.svelte';
	import SettingsEntry from './SettingsEntry.svelte';
</script>

<div class="flex flex-col pt-2">
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
