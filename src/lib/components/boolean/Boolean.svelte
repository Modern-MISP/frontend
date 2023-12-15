<script lang="ts">
	import Info from '../info/Info.svelte';

	export let isTrue: boolean | string = true;

	$: text = isTrue === 'true' || isTrue ? 'Yes' : 'No';
</script>

<Info {text} class="text-white font-bold px-4 m-auto {isTrue ? 'bg-green' : 'bg-red'}" />
