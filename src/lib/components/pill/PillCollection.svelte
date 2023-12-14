<script lang="ts">
	import Pill from '$lib/components/pill/Pill.svelte';

	export let tags: Pill['$$prop_def'][];
</script>

<div class="flex flex-wrap gap-2">
	{#each tags as tag}
		<Pill {...tag} />
	{/each}
</div>
