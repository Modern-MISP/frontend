<script lang="ts">
	import Icon from '@iconify/svelte';

	export let value: string;
	export let icon: string;
</script>

<th>
	<div class="flex items-center gap-2 p-4 text-xl">
		<Icon {icon} />
		<span>
			{value}
		</span>
	</div>
</th>
