<script lang="ts">
	import Icon from '@iconify/svelte';

	export let routes: { name: string; icon: string; href: string }[] = [];

	export let action: 'add' | 'remove' | 'list' | 'edit' = 'list';
</script>

<div class="flex items-center text-lg font-medium text-text">
	{#each routes as { href, icon, name }}
		<a {href} class="flex items-center gap-2 rounded-full cursor-pointer hover:text-sky">
			<Icon {icon} />
			{name}
		</a>

		<Icon icon="mdi:chevron-right" class="w-8 h-8 text-sky " />
	{/each}

	<span class="text-sky">
		{action.slice(0, 1).toUpperCase() + action.slice(1)}
	</span>
</div>
