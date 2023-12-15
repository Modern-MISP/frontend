<script lang="ts">
	import { page } from '$app/stores';
	import { currentAction, currentRoute } from '$lib/stores';
	$currentRoute = [
		{
			name: 'Events',
			icon: 'mdi:calendar-outline',
			href: 'event'
		},
		{
			name: $page.params.id,
			icon: 'mdi:id-card',
			href: '/event/list'
		}
	];
	$currentAction = 'view';
</script>

<div class="flex flex-col pt-2">event</div>
