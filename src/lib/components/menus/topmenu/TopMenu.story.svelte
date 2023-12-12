<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import TopMenu from './TopMenu.svelte';
	export let Hst: Hst;
</script>

<Hst.Story>
	<TopMenu />
</Hst.Story>
