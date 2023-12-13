<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import { themes } from '$lib/stores';
	import Table from './Table.svelte';
	export let Hst: Hst;

	let theme = 'macchiato';
</script>

<Hst.Story>
	<svelte:fragment slot="controls">
		<Hst.Select title="Theme" bind:value={theme} options={themes} />
	</svelte:fragment>

	<div class={theme}>
		<Table
			header={[
				{ icon: 'mdi:home', name: 'id', value: 'ID' },
				{ icon: 'mdi:tea', name: 'test', value: 'Tea' },
				{ icon: 'mdi:ab-testing', name: 'anything', value: 'Anything' },
				{ icon: 'mdi:abacus', name: 'foo', value: 'Foo' }
			]}
			data={[
				{ id: '1', test: 'Lorem', anything: 'asdf', foo: 'Foo' },
				{ id: '2', test: 'Lorem', anything: 'asdf', foo: 'Foo' },
				{ id: '3', test: 'Lorem', anything: 'asdf', foo: 'Foo' },
				{ id: '4', test: 'Lorem', anything: 'asdf', foo: 'Foo' },
				{ id: '5', test: 'Lorem', anything: 'asdf', foo: 'Foo' }
			]}
		/>
	</div>
</Hst.Story>
