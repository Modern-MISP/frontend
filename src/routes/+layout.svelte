<script lang="ts">
	import ChevronLeft from 'svelte-material-icons/ChevronLeft.svelte';
	import ChevronDown from 'svelte-material-icons/ChevronDown.svelte';
	import ChevronUp from 'svelte-material-icons/ChevronUp.svelte';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
	import EventIcon from 'svelte-material-icons/Calendar.svelte';
	import AdminIcon from 'svelte-material-icons/ShieldCrown.svelte';
	import ProfileIcon from 'svelte-material-icons/Account.svelte';
	import ProfileCircle from 'svelte-material-icons/AccountCircle.svelte';
	import PinIcon from 'svelte-material-icons/Pin.svelte';
	import PinOffIcon from 'svelte-material-icons/PinOff.svelte';
	import EyeIcon from 'svelte-material-icons/EyeCircleOutline.svelte';
	import SearchIcon from 'svelte-material-icons/Magnify.svelte';
	import SettingsIcon from 'svelte-material-icons/Cog.svelte';
	import WorkFlowIcon from 'svelte-material-icons/SitemapOutline.svelte';
	import { page } from '$app/stores';
	import { settings } from '$lib/stores';
	import TopMenu from '$lib/components/menus/topmenu/TopMenu.svelte';

	let openMenu = $settings.openOnInit;

	function navigateWithKeyboard({ key }: KeyboardEvent) {
		if (key === 'm') {
			openMenu = !openMenu;
		}
	}
</script>

<svelte:window on:keypress={navigateWithKeyboard} />
<div class="absolute w-[100vw] h-full flex flex-row bg-base text-text {$settings.theme}">
	{#if openMenu}
		<div class="relative flex flex-col gap-6 p-2 rounded-md bg-mantle">
			<div class="flex gap-3 px-6 pt-6">
				<div class="w-10 h-10 rounded-full bg-text">.</div>
				<h1 class="text-4xl font-bold">MISP</h1>
			</div>
			<div class="px-6">
				<hr />
			</div>

			<div class="flex flex-col gap-2">
				<h3 class="px-4 text-sm underline">Fast access</h3>
				<a
					href="event"
					class:text-sky={$page.url.href.includes('event')}
					class="flex items-center gap-2 p-4 cursor-pointer w-60 hover:text-sky"
				>
					<div class="text-2xl rounded-full"><EventIcon /></div>
					<span> Events/List </span>
					<div class="ml-auto text-2xl rounded-full"><PinOffIcon /></div>
				</a>

				<a
					href="settings"
					class:text-sky={$page.url.href.includes('settings')}
					class="flex items-center gap-2 p-4 cursor-pointer w-60 hover:text-sky"
				>
					<div class="text-2xl rounded-full"><SettingsIcon /></div>
					<span> Settings </span>
					<div class="ml-auto text-2xl rounded-full"><PinIcon /></div>
				</a>
				<a
					href="workflow"
					class:text-sky={$page.url.href.includes('workflow')}
					class="flex items-center gap-2 p-4 cursor-pointer w-60 hover:text-sky"
				>
					<div class="text-2xl rounded-full"><WorkFlowIcon /></div>
					<span> Workflow </span>
					<div class="ml-auto text-2xl rounded-full"><PinIcon /></div>
				</a>
			</div>
			<div class="px-6">
				<hr />
			</div>
			<div class="flex flex-col gap-2">
				<div
					class="flex items-center gap-2 p-4 rounded-md cursor-pointer w-60 bg-crust hover:text-sky"
				>
					<div class="text-2xl rounded-full"><EventIcon /></div>
					<span> Events/List </span>
					<div class="ml-auto text-2xl rounded-full"><ChevronDown /></div>
				</div>

				<div
					class="flex items-center gap-2 p-4 rounded-md cursor-pointer w-60 bg-crust hover:text-sky"
				>
					<div class="text-2xl rounded-full"><ProfileIcon /></div>
					<span> Profile </span>
					<div class="ml-auto text-2xl rounded-full"><ChevronDown /></div>
				</div>
			</div>
			<div class="flex flex-col gap-4 px-6 pb-4 mt-auto">
				<hr />
				<div class="flex justify-between">
					<span>Version 0.0.1</span>
					<button
						on:click={() => (openMenu = false)}
						class="ml-auto text-2xl rounded-full cursor-pointer hover:text-sky"
					>
						<ChevronLeft />
					</button>
				</div>
			</div>
		</div>
	{:else}
		<div class="relative flex flex-col items-center gap-6 p-4 pt-8 rounded-md bg-mantle">
			<div class="w-10 h-10 rounded-full bg-text">.</div>
			<hr class="w-full" />
			<a
				href="event"
				class:text-sky={$page.url.href.includes('event')}
				class="text-2xl rounded-full cursor-pointer hover:text-sky"><EventIcon /></a
			>
			<a
				href="settings"
				class:text-sky={$page.url.href.includes('settings')}
				class="text-2xl rounded-full cursor-pointer hover:text-sky"><SettingsIcon /></a
			>
			<hr class="w-full" />
			<div class="text-2xl rounded-full cursor-pointer hover:text-sky"><EventIcon /></div>
			<div class="text-2xl rounded-full cursor-pointer hover:text-sky"><ProfileIcon /></div>
			<hr class="w-full mt-auto" />
			<button
				on:click={() => (openMenu = true)}
				class="text-2xl rounded-full cursor-pointer hover:text-sky"
			>
				<ChevronRight />
			</button>
		</div>
	{/if}

	<div class="flex flex-col h-full min-w-0 grow">
		<TopMenu />

		<main class="relative h-full m-8 overflow-auto">
			<slot />
		</main>
	</div>
</div>
