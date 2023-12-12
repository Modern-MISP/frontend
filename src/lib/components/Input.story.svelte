<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Input from './Input.svelte';
	export let Hst: Hst;
	import SearchIcon from 'svelte-material-icons/Magnify.svelte';
</script>

<Hst.Story>
	<Input placeholder="Hello World!">
		<svelte:fragment slot="icon">
			<SearchIcon class="w-10 h-10" />
		</svelte:fragment>
	</Input>
</Hst.Story>
