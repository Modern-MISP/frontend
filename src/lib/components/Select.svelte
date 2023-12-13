<script lang="ts" generics="T extends string">
	import ChevronDown from 'svelte-material-icons/ChevronDown.svelte';
	export let options: readonly { value: T; label: string }[];
	export let value: T;
</script>

<div class="relative flex items-center">
	<select class="px-4 py-3 pr-8 transition-all rounded-md appearance-none bg-crust pe-3" bind:value>
		{#each options as { value, label }}
			<option {value}>{label}</option>
		{/each}
	</select>

	<div class="absolute text-xl right-1">
		<ChevronDown />
	</div>
</div>
