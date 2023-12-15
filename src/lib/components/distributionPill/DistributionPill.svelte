<script lang="ts">
	import Pill from '../pill/Pill.svelte';

	export let distribution: number = 0;
	const numberLookUp = [
		{
			text: 'Your organization only',
			icon: 'mdi:circle'
		},
		{
			text: 'This community only',
			icon: 'mdi:circle'
		},
		{
			text: 'Connected communities',
			icon: 'mdi:circle'
		},
		{
			text: 'All communities',
			icon: 'mdi:circle'
		},
		{
			text: 'Sharing group',
			icon: 'mdi:circle'
		},
		{
			text: 'Inherit Event',
			icon: 'mdi:circle'
		}
	];
</script>

<Pill {...numberLookUp[distribution]} />
