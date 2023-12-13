<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Input from './Input.svelte';
	import { themes } from '$lib/stores';
	import SearchIcon from 'svelte-material-icons/Magnify.svelte';

	export let Hst: Hst;
	let theme = 'macchiato';
	let placeholder = 'Hello World!';
</script>

<Hst.Story>
	<svelte:fragment slot="controls">
		<Hst.Select title="Theme" bind:value={theme} options={themes} />

		<Hst.Text title="Placeholder" bind:value={placeholder} />
	</svelte:fragment>

	<div class={theme}>
		<br />
		<Input {placeholder}>
			<svelte:fragment slot="icon">
				<SearchIcon class="w-10 h-10" />
			</svelte:fragment>
		</Input>
	</div>
</Hst.Story>
