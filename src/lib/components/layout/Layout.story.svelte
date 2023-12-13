<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Input from './Layout.svelte';
	import { themes } from '$lib/stores';
	import Layout from './Layout.svelte';

	export let Hst: Hst;
	let theme = 'macchiato';
</script>

<Hst.Story>
	<svelte:fragment slot="controls">
		<Hst.Select title="Theme" bind:value={theme} options={themes} />
	</svelte:fragment>

	<div class={theme}>
		<Layout />
	</div>
</Hst.Story>
