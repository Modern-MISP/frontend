<script>
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
	import { page } from '$app/stores';
	import { settings } from '$lib/stores';

	let openMenu = $settings.openOnInit;
</script>

<div class="absolute w-[100vw] h-full flex flex-row bg-base text-text {$settings.theme}">
	{#if openMenu}
		<div class="bg-mantle p-2 relative rounded-md flex flex-col gap-6">
			<div class="flex gap-3 px-6 pt-6">
				<div class="h-10 w-10 rounded-full bg-text">.</div>
				<h1 class="text-4xl font-bold">MISP</h1>
			</div>
			<div class="px-6">
				<hr />
			</div>

			<div class="flex flex-col gap-2">
				<h3 class="text-sm underline px-4">Fast access</h3>
				<a
					href="event"
					class:text-sky={$page.url.href.includes('event')}
					class="flex gap-2 w-60 items-center p-4 hover:text-sky cursor-pointer"
				>
					<div class=" text-2xl rounded-full"><EventIcon /></div>
					<span> Events/List </span>
					<div class=" text-2xl ml-auto rounded-full"><PinOffIcon /></div>
				</a>

				<a
					href="settings"
					class:text-sky={$page.url.href.includes('settings')}
					class="flex gap-2 w-60 items-center p-4 hover:text-sky cursor-pointer"
				>
					<div class=" text-2xl rounded-full"><SettingsIcon /></div>
					<span> Settings </span>
					<div class=" text-2xl ml-auto rounded-full"><PinIcon /></div>
				</a>
			</div>
			<div class="px-6">
				<hr />
			</div>
			<div class="flex flex-col gap-2">
				<div
					class="flex gap-2 w-60 items-center bg-crust p-4 rounded-md hover:text-sky cursor-pointer"
				>
					<div class=" text-2xl rounded-full"><EventIcon /></div>
					<span> Events/List </span>
					<div class=" text-2xl ml-auto rounded-full"><ChevronDown /></div>
				</div>

				<div
					class="flex gap-2 w-60 items-center bg-crust p-4 rounded-md hover:text-sky cursor-pointer"
				>
					<div class=" text-2xl rounded-full"><ProfileIcon /></div>
					<span> Profile </span>
					<div class=" text-2xl ml-auto rounded-full"><ChevronDown /></div>
				</div>
			</div>
			<div class="mt-auto flex flex-col gap-4 px-6 pb-4">
				<hr />
				<div class="flex justify-between">
					<span>Version 0.0.1</span>
					<button
						on:click={() => (openMenu = false)}
						class="text-2xl ml-auto rounded-full hover:text-sky cursor-pointer"
					>
						<ChevronLeft />
					</button>
				</div>
			</div>
		</div>
	{:else}
		<div class="bg-mantle p-4 pt-8 relative rounded-md flex flex-col gap-6 items-center">
			<div class="h-10 w-10 rounded-full bg-text">.</div>
			<hr class="w-full" />
			<a
				href="event"
				class:text-sky={$page.url.href.includes('event')}
				class=" text-2xl rounded-full hover:text-sky cursor-pointer"><EventIcon /></a
			>
			<a
				href="settings"
				class:text-sky={$page.url.href.includes('settings')}
				class=" text-2xl rounded-full hover:text-sky cursor-pointer"><SettingsIcon /></a
			>
			<hr class="w-full" />
			<div class=" text-2xl rounded-full hover:text-sky cursor-pointer"><EventIcon /></div>
			<div class=" text-2xl rounded-full hover:text-sky cursor-pointer"><ProfileIcon /></div>
			<hr class="w-full mt-auto" />
			<button
				on:click={() => (openMenu = true)}
				class="text-2xl rounded-full hover:text-sky cursor-pointer"
			>
				<ChevronRight />
			</button>
		</div>
	{/if}

	<div class="grow flex flex-col h-full min-w-0">
		<div class="bg-mantle items-center p-4 rounded-md ml-4 flex flex-row justify-between gap-4">
			<h1 class="text-2xl">Dashboard</h1>
			<div class="flex gap-6 items-center">
				<div class=" flex gap-4 items-center p-3 w-96 bg-crust rounded-md mr-4">
					<div class=" text-3xl rounded-full"><SearchIcon /></div>
					<span> Search </span>
				</div>
				<div class="flex flex-col items-center gap-1">
					<div class=" text-5xl rounded-full"><EyeIcon /></div>
					<span class="text-xs">View mode</span>
				</div>
				<div class="flex flex-col items-center gap-1">
					<div class=" text-5xl rounded-full"><ProfileCircle /></div>
					<span class="text-xs">admin@admin.test</span>
				</div>
			</div>
		</div>
		<main class="m-8 relative overflow-auto">
			<slot />
		</main>
	</div>
</div>
