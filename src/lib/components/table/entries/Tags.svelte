<script lang="ts">
	import Pill from './Pill.svelte';

	export let tags: { icon: string; text: string; class: string }[];
</script>

<div class="flex flex-wrap gap-2">
	{#each tags as tag}
		<Pill {...tag} />
	{/each}
</div>
