<script lang="ts">
	import { page } from '$app/stores';

	import Boolean from '$lib/components/boolean/Boolean.svelte';
	import Info from '$lib/components/info/Info.svelte';

	import Pill from '$lib/components/pill/Pill.svelte';

	import DynTable from '$lib/components/dynTable/DynTable.svelte';

	import PillCollection from '$lib/components/pill/PillCollection.svelte';
	import { currentAction, currentRoute } from '$lib/stores';
	import type { PageData } from './$types';
	import DistributionPill from '$lib/components/distributionPill/DistributionPill.svelte';
	$currentRoute = [
		{
			name: 'Galaxy',
			icon: 'streamline:galaxy-2-solid',
			href: '/galaxy'
		},
		{
			name: $page.params.id,
			icon: 'mdi:id-card',
			href: '/galaxy/list'
		}
	];
	$currentAction = 'view';

	export let data: PageData;

	const header = [
		{ icon: 'mdi:id-card', name: 'id', value: 'ID' },
		{ icon: 'mdi:circle', name: 'value', value: 'Value', displayComp: Info },
		{ icon: 'mdi:information', name: 'description', value: 'Description', displayComp: Info },
		{
			icon: 'material-symbols:work-outline',
			name: 'org',
			value: 'Organisations',
			displayComp: PillCollection
		},
		{ icon: 'ph:hash-bold', name: 'event_count', value: 'Events', displayComp: Pill },
		// { icon: 'ph:hash-bold', name: 'relations', value: 'Relations', displayComp: PillCollection },

		{
			icon: 'mdi:checkbox-marked-outline',
			name: 'default',
			value: 'Default',
			displayComp: Boolean
		},
		{
			icon: 'mdi:web-sync',
			name: 'published',
			value: 'Published',
			displayComp: Boolean
		},

		{
			icon: 'mdi:web',
			name: 'distribution',
			value: 'Distribution',
			displayComp: DistributionPill,
			class: 'w-56'
		}
	] as const;

	console.log(data.galaxy.GalaxyCluster);

	const tableData: DynTable<typeof header>['$$prop_def']['data'] = data.galaxy.GalaxyCluster.map(
		(x) => ({
			id: x.id,
			value: { text: x.value },
			description: { text: x.description || 'none' },
			org: {
				class: 'flex-col',
				pills: [
					{
						icon: 'material-symbols:work-outline',
						text: x.org_id ?? 'unknown'
					},

					{
						icon: 'mdi:account-outline',
						text: x.orgc_id ?? 'unknown'
					}
				]
			},
			event_count: {
				icon: 'ph:hash-bold',
				text: '!apiResponse'
			},
			// relations: { text: x.relations },
			default: { isTrue: x.default, class: 'm-auto' },
			published: { isTrue: x.published, class: 'm-auto' },
			distribution: { distribution: +x.distribution }
		})
	);

	const info = data.galaxy.Galaxy;
</script>

<div class="flex w-full gap-2">
	<div class="flex flex-col w-full gap-4 p-4 rounded-lg bg-surface0">
		<div class="flex justify-between text-lg">
			<span class="font-bold">Name</span>
			<span>{info?.name ?? 'unknown'}</span>
		</div>

		<div class="flex justify-between text-lg">
			<span class="font-bold">Description</span>
			<span class="pl-10">{info?.description ?? 'unknown'}</span>
		</div>

		<div class="flex justify-between text-lg">
			<span class="font-bold">Namespace</span>
			<span>{info?.namespace ?? 'unknown'}</span>
		</div>
	</div>

	<div class="flex flex-col w-full gap-4 p-4 rounded-lg bg-surface0">
		<div class="flex justify-between text-lg">
			<span class="font-bold">Version</span>
			<span>{info?.version ?? 'unknown'}</span>
		</div>

		<div class="flex justify-between text-lg">
			<span class="font-bold">Id</span>
			<span>{info?.id ?? 'unknown'}</span>
		</div>

		<div class="flex justify-between text-lg">
			<span class="font-bold">UUID</span>
			<span>{info?.uuid ?? 'unknown'}</span>
		</div>

		<div class="flex items-center justify-between text-lg">
			<span class="font-bold">Enabled</span>
			<Boolean isTrue={info.enabled} />
		</div>

		<div class="flex items-center justify-between text-lg">
			<span class="font-bold">Local Only</span>
			<Boolean isTrue={info.local_only} />
		</div>
	</div>
</div>

<DynTable {header} data={tableData} />
