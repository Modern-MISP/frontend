<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	export let Hst: Hst;
	import Checkbox from './Checkbox.svelte';
</script>

<Hst.Story>
	<div class="h-10" />
	<Checkbox checked={false} />
</Hst.Story>
