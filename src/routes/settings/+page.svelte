<script>
	import { settings } from '$lib/stores';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Select from '$lib/components/Select.svelte';
	import SettingsEntry from './SettingsEntry.svelte';
</script>

<div class="flex flex-col pt-2">
	<SettingsEntry label="Menu is open per default">
		<Checkbox bind:checked={$settings.openOnInit} />
	</SettingsEntry>
	<SettingsEntry label="Theme">
		<Select
			options={[
				{ value: 'mocha', label: 'Mocha' },
				{ value: 'macchiato', label: 'Macchiato' },
				{ value: 'frappe', label: 'Frappe' },
				{ value: 'latte', label: 'Latte' }
			]}
			bind:value={$settings.theme}
		/>
	</SettingsEntry>
</div>
