<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import { themes } from '$lib/stores';
	import PillNavigation from './PillNavigation.svelte';
	export let Hst: Hst;

	let theme = 'macchiato';
	let routes = [
		{
			name: 'Admin',
			icon: 'mdi:shield-account',
			href: 'admin'
		},
		{
			name: 'Users',
			icon: 'mdi:account',
			href: 'settings'
		}
	];
</script>

<Hst.Story>
	<svelte:fragment slot="controls">
		<Hst.Select title="Theme" bind:value={theme} options={themes} />
	</svelte:fragment>

	<div class={theme}>
		<PillNavigation {routes} action="add" />
	</div>
</Hst.Story>
