<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import SearchIcon from 'svelte-material-icons/Magnify.svelte';
	import Button from './Button.svelte';
	import { themes } from '$lib/stores';
	export let Hst: Hst;

	let theme = 'macchiato';
</script>

<Hst.Story>
	<svelte:fragment slot="controls">
		<Hst.Select title="Theme" bind:value={theme} options={themes} />
	</svelte:fragment>

	<div class={theme}>
		<Button>
			<b>name</b>
			<SearchIcon />
		</Button>
	</div>
</Hst.Story>
