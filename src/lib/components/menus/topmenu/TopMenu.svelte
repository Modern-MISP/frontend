<script>
	import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import { mode } from '$lib/stores';
	import ProfileCircle from 'svelte-material-icons/AccountCircle.svelte';
	import SearchIcon from 'svelte-material-icons/Magnify.svelte';
</script>

<div
	class="flex flex-row items-center justify-between gap-4 p-4 ml-4 rounded-md bg-mantle text-text"
>
	<Input placeholder="Search">
		<svelte:fragment slot="icon">
			<SearchIcon class="w-8 h-8" />
		</svelte:fragment>
	</Input>
	<div class="flex items-center gap-6">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="flex flex-col items-center gap-1">
			<Checkbox
				checked={$mode === 'edit'}
				on:change={() => ($mode = $mode === 'view' ? 'edit' : 'view')}
			/>
			<span class="text-xs">View mode</span>
		</label>
		<div class="flex flex-col items-center gap-1">
			<div class="text-2xl rounded-full"><ProfileCircle /></div>
			<span class="text-xs">admin@admin.test</span>
		</div>
	</div>
</div>
