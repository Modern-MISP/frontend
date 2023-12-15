<script lang="ts">
	import Boolean from '$lib/components/boolean/Boolean.svelte';
	import Info from '$lib/components/info/Info.svelte';
	import { currentAction, currentRoute } from '$lib/stores';

	import DynTable from '$lib/components/dynTable/DynTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { galaxies } = data;

	$currentRoute = [
		{
			name: 'Galaxy',
			icon: 'streamline:galaxy-2-solid',
			href: '/galaxy'
		}
	];
	$currentAction = 'list';

	console.log(galaxies);

	const header = [
		{ icon: 'mdi:id-card', name: 'id', value: 'ID' },
		{ icon: 'mdi:circle', name: 'icon', value: 'Icon', displayComp: Info },
		{ icon: 'mdi:circle', name: 'name', value: 'Name', displayComp: Info },
		{ icon: 'mdi:telescope', name: 'namespace', value: 'Namespace', displayComp: Info },
		{ icon: 'mdi:information', name: 'description', value: 'Description', displayComp: Info },
		{
			icon: 'mdi:circle',
			name: 'version',
			value: 'Version',
			displayComp: Info
		},
		{
			icon: 'mdi:checkbox-marked-outline',
			name: 'enabled',
			value: 'Enabled',
			displayComp: Boolean
		},
		{
			icon: 'mdi:cloud-off-outline',
			name: 'local_only',
			value: 'Local only',
			class: 'whitespace-nowrap',
			displayComp: Boolean
		}
	] as const;

	const tableData: DynTable<typeof header>['$$prop_def']['data'] = galaxies
		.map((x) => x.Galaxy)
		.map((x) => ({
			id: x?.id ?? '',
			icon: { text: x?.icon ?? '' },
			name: { text: x?.name ?? '' },
			namespace: { text: x?.namespace ?? '' },
			description: { text: x?.description ?? '' },
			version: { text: x?.version ?? '', class: 'm-auto px-6' },
			enabled: { isTrue: x?.enabled ?? '', class: 'm-auto' },
			local_only: { isTrue: x?.local_only ?? '', class: 'm-auto' }
		}));
</script>

<DynTable urlCb={(id) => `/galaxy/${id}/view`} {header} data={tableData} />
