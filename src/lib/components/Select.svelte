<script lang="ts" generics="T extends string">
	import ChevronDown from 'svelte-material-icons/ChevronDown.svelte';
	export let options: { value: T; label: string }[];
	export let value: T;
</script>

<div class="flex relative items-center">
	<select class="bg-crust py-3 px-4 pr-8 pe-3 rounded-md transition-all appearance-none" bind:value>
		{#each options as { value, label }}
			<option {value}>{label}</option>
		{/each}
	</select>

	<div class="right-1 text-xl absolute">
		<ChevronDown />
	</div>
</div>
