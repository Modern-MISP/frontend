<script lang="ts">
	import TopMenu from '$lib/components/menus/topmenu/TopMenu.svelte';
	import SideMenu from '$lib/components/menus/sidemenu/SideMenu.svelte';
	import PillNavigation from '$lib/components/pillNavigation/PillNavigation.svelte';
	import { currentAction, currentRoute, mode, settings } from '$lib/stores';
	import { page } from '$app/stores';
	export let routes = [
		{
			name: 'Events',
			icon: 'mdi-calendar',
			href: '/event'
		},
		{
			name: 'Galaxies',
			icon: 'streamline:galaxy-2-solid',
			href: '/galaxy'
		},
		{
			name: 'Workflows',
			icon: 'material-symbols:network-node',
			href: '/workflows'
		},
		{
			name: 'Admin',
			icon: 'mdi-shield-account',
			href: '/admin'
		},
		{
			name: 'Settings',
			icon: 'mdi-cog',
			href: '/settings'
		}
	];
</script>

<div class="absolute w-[100vw] h-full flex flex-row bg-base text-text {$settings.theme}">
	<slot name="sideMenu">
		<SideMenu {routes} activeRoute={$page.url.toString()} />
	</slot>

	<div class="flex flex-col h-full min-w-0 grow">
		<TopMenu bind:mode={$mode} />

		<main class="relative h-full m-8 overflow-auto">
			<PillNavigation routes={$currentRoute} action={$currentAction} />
			<br />
			<slot />
		</main>
	</div>
</div>
