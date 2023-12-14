<script lang="ts">
	import { page } from '$app/stores';
	import { currentAction, currentRoute } from '$lib/stores';
	$currentRoute = [
		{
			name: 'Galaxy',
			icon: 'streamline:galaxy-2-solid',
			href: 'galaxy'
		},
		{
			name: $page.params.id,
			icon: 'mdi:id-card',
			href: '/galaxy/list'
		}
	];
	$currentAction = 'edit';
</script>

<div class="flex flex-col pt-2">galaxy</div>
