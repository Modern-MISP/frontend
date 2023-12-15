<script lang="ts">
	import Pill from '$lib/components/pill/Pill.svelte';

	export let pills: Pill['$$prop_def'][];

	let clazz: string = '';
	export { clazz as class };
</script>

<div class="flex flex-wrap gap-2 {clazz}">
	{#each pills as pill}
		<Pill {...pill} />
	{/each}
</div>
