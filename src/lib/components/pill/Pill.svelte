<script lang="ts">
	import Icon from '@iconify/svelte';

	export let text = '';
	export let icon: string;

	let clazz = '';
	export { clazz as class };
</script>

<div class="flex items-center gap-2 px-2 py-1 rounded-lg bg-surface1 text-text {clazz}">
	<Icon {icon} />
	<span class="line-clamp-1">
		<slot>
			{text}
		</slot>
	</span>
</div>
