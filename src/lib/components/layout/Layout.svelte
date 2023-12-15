<script lang="ts">
	import TopMenu from '$lib/components/menus/topmenu/TopMenu.svelte';
	import SideMenu from '$lib/components/menus/sidemenu/SideMenu.svelte';
	import PillNavigation from '../pillNavigation/PillNavigation.svelte';
	import Pill from '../pill/Pill.svelte';
	export let routes = [
		{
			name: 'Events',
			icon: 'mdi-calendar',
			href: 'event'
		},
		{
			name: 'Galaxies',
			icon: 'streamline:galaxy-2-solid',
			href: 'galaxy'
		},
		{
			name: 'Workflows',
			icon: 'material-symbols:network-node',
			href: 'workflows'
		},
		{
			name: 'Admin',
			icon: 'mdi-shield-account',
			href: 'admin'
		},
		{
			name: 'Settings',
			icon: 'mdi-cog',
			href: 'settings'
		}
	];

	export let currentRoute: PillNavigation['$$prop_def']['routes'] = [
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

	export let currentAction: PillNavigation['$$prop_def']['action'] = 'add';
</script>

<div class="absolute w-[100vw] h-full flex flex-row bg-base text-text">
	<slot name="sideMenu">
		<SideMenu {routes} />
	</slot>

	<div class="flex flex-col h-full min-w-0 grow">
		<TopMenu />

		<main class="relative h-full m-8 overflow-auto">
			<PillNavigation routes={currentRoute} action={currentAction} />
			<br />
			<slot />
		</main>
	</div>
</div>
