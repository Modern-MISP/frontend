<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	export let Hst: Hst;
	import SearchIcon from 'svelte-material-icons/Magnify.svelte';
	import Button from './Button.svelte';
</script>

<Hst.Story>
	<Button class="bg-green-600"
		>name
		<SearchIcon />
	</Button>
</Hst.Story>
