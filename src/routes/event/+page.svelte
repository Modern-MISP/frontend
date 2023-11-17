<script lang="ts">
	import type { PageData } from './$types';
	import { map } from 'lodash-es';
	import { format } from 'date-fns';
	import { settings } from '$lib/stores';

	export let data: PageData;
	console.log(data);

	let x = map(
		data.events,
		({
			id,
			Org,
			Orgc,
			attribute_count,
			published,
			date,
			distribution,
			publish_timestamp,
			threat_level_id,
			info,
			EventTag,
			GalaxyCluster
		}: (typeof data.events)[number] & {
			EventTag: {
				Tag: NonNullable<(typeof data.events)[number]['Tag']>[number];
			}[];
			GalaxyCluster: {
				Galaxy: NonNullable<(typeof data.events)[number]['Galaxy']>[number];
			}[];
		}) => ({
			id,
			info,
			tags: EventTag,
			galaxies: GalaxyCluster,
			published,
			'Owner Org': Org?.name,
			'Creator Org': Orgc?.name,
			threat_level_id,
			date: date ? format(new Date(date), 'dd.MM.yyyy') : 'invalid',
			distribution,
			attribute_count,
			publish_timestamp
		})
	);
</script>

{#if data.events.length > 0}
	<table class="table-auto text-xs" class:w-max={$settings.tableMaxSize}>
		<tr class="border-b font-medium dark:border-neutral-500">
			{#each Object.keys(x[0]) as title}
				<td class="border-r px-6 py-4 dark:border-neutral-500">{title}</td>
			{/each}
		</tr>

		{#each x as event}
			<tr class="border-b dark:border-neutral-500">
				{#each Object.entries(event) as [key, value]}
					<td class="border-r px-6 py-4 dark:border-neutral-500">
						{#if key === 'tags'}
							<div class="flex flex-wrap gap-2">
								{#each value || [] as e}
									<div style:background-color={e.Tag.colour} class="py-1 px-2 rounded-md">
										{e.Tag.name}
									</div>
								{/each}
							</div>
						{:else if key === 'galaxies'}
							<div class="flex flex-wrap gap-2">
								{#each value || [] as e}
									<div class="py-1 px-2 rounded-md bg-blue">
										{e.Galaxy.name}
									</div>
								{/each}
							</div>
						{:else}
							{value}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</table>
{:else}
	Noch keine Events vorhanden
{/if}
