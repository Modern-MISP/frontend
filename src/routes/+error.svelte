<script>
	import { page } from '$app/stores';
	import { currentAction, currentRoute } from '$lib/stores';

	$currentRoute = [
		{
			name: 'Error',
			icon: 'mdi:alert-circle-outline',
			href: '/error'
		}
	];

	$currentAction = 'error';
</script>

<div class="flex flex-col items-center justify-center w-full h-full gap-6 p-5 text-center text-red">
	<h2 class="text-9xl">
		{$page.status}
	</h2>
	<h1 class="text-4xl font-bold">An error occurred!</h1>
	<p class="text-xl">
		{$page.error?.message}
	</p>
</div>
