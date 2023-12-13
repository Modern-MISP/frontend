<script>
	import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import { mode } from '$lib/stores';
	import Icon from '@iconify/svelte';
</script>

<div
	class="flex flex-row items-center justify-between gap-4 p-4 ml-4 rounded-xl bg-mantle text-text"
>
	<Input placeholder="search">
		<Icon icon="mdi:magnify" slot="icon" class="w-10 h-10" />
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
			<div class="text-2xl rounded-full">
				<Icon icon="mdi:account-circle" />
			</div>
			<span class="text-xs">admin@admin.test</span>
		</div>
	</div>
</div>
