<script>
	import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import { settings } from '$lib/stores';
	import ProfileCircle from 'svelte-material-icons/AccountCircle.svelte';
	import SearchIcon from 'svelte-material-icons/Magnify.svelte';

	let checked = false;
</script>

<div class="flex flex-row items-center justify-between gap-4 p-4 ml-4 rounded-md bg-mantle">
	<Input placeholder="Search">
		<svelte:fragment slot="icon">
			<SearchIcon class="w-8 h-8" />
		</svelte:fragment>
	</Input>
	<div class="flex items-center gap-6">
		<div class="flex flex-col items-center gap-1">
			<Checkbox bind:checked={$settings.openOnInit} />
			<span class="text-xs">View mode</span>
		</div>
		<div class="flex flex-col items-center gap-1">
			<div class="text-2xl rounded-full"><ProfileCircle /></div>
			<span class="text-xs">admin@admin.test</span>
		</div>
	</div>
</div>
