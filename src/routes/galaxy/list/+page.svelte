<script lang="ts">
	import { currentAction, currentRoute } from '$lib/stores';
	import Pill from '$lib/components/pill/Pill.svelte';
	import Info from '$lib/components/info/Info.svelte';
	import DatePill from '$lib/components/pill/DatePill.svelte';

	import Tags from '$lib/components/pill/PillCollection.svelte';
	import DynTable from '$lib/components/dynTable/DynTable.svelte';

	$currentRoute = [
		{
			name: 'Galaxy',
			icon: 'streamline:galaxy-2-solid',
			href: 'galaxy'
		}
	];
	$currentAction = 'list';

	const header = [
		{ icon: 'mdi:home', name: 'id', value: 'ID' },
		{ icon: 'mdi:email', name: 'email', value: 'Email', displayComp: Pill },
		{ icon: 'mdi:key', name: 'key', value: 'Key', displayComp: Pill },
		{ icon: 'mdi:information', name: 'info', value: 'Info', displayComp: Info },
		{ icon: 'mdi:clock', name: 'date', value: 'Date', displayComp: DatePill },
		{ icon: 'mdi:tag', name: 'tags', value: 'Tags', displayComp: Tags }
	] as const;
</script>

<DynTable
	urlCb={(id) => `/galaxy/${id}/view`}
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
