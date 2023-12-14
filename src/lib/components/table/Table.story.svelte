<script lang="ts">
	import { themes } from '$lib/stores';
	import type { Hst } from '@histoire/plugin-svelte';
	import Table from './Table.svelte';
	import DatePill from './entries/DatePill.svelte';
	import Info from './entries/Info.svelte';
	import Pill from './entries/Pill.svelte';
	import Tags from './entries/Tags.svelte';
	export let Hst: Hst;

	let theme = 'macchiato';

	const header = [
		{ icon: 'mdi:home', name: 'id', value: 'ID' },
		{ icon: 'mdi:email', name: 'email', value: 'Email', displayComp: Pill },
		{ icon: 'mdi:key', name: 'key', value: 'Key', displayComp: Pill },
		{ icon: 'mdi:information', name: 'info', value: 'Info', displayComp: Info },
		{ icon: 'mdi:tag', name: 'tags', value: 'Tags', displayComp: Tags },
		{ icon: 'mdi:clock', name: 'date', value: 'Date', displayComp: DatePill }
	] as const;
</script>

<Hst.Story>
	<svelte:fragment slot="controls">
		<Hst.Select title="Theme" bind:value={theme} options={themes} />
	</svelte:fragment>

	<div class={theme}>
		<Table
			{header}
			data={[
				{
					id: '1',
					email: { icon: 'mdi:email', text: 'admin@admin.test' },
					key: { icon: 'mdi:key', text: 'ABC*********DEF' },
					info: {
						text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
					},
					date: { date: new Date() },
					tags: {
						tags: [
							{ icon: 'mdi:email', text: 'admin@admin.test', class: '!bg-red !text-white' },
							{ icon: 'mdi:email', text: 'asdf', class: '!bg-peach !text-white' }
						]
					}
				},
				{
					id: '2',
					email: { icon: 'mdi:email', text: 'admin@admin.test' },
					key: { icon: 'mdi:key', text: 'ABC*********DEF' },
					info: {
						text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
					},
					date: { date: new Date() },
					tags: {
						tags: [
							{ icon: 'mdi:email', text: 'admin@admin.test', class: '!bg-red !text-white' },
							{ icon: 'mdi:email', text: 'asdf', class: '!bg-peach !text-white' }
						]
					}
				}
			]}
		/>
	</div>
</Hst.Story>
