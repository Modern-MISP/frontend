<script lang="ts" generics=" T extends readonly HeaderEntry[] ">
	import Td from '../modularTable/Td.svelte';

	import { goto } from '$app/navigation';
	import type { FlatUnion } from '$lib/util/ts.util';
	import { stringify } from 'postcss';

	import Table from '../modularTable/Table.svelte';
	import Th from '../modularTable/Th.svelte';
	import type { HeaderEntry } from './HeaderEntry.interface';

	export let header: T;
	export let data: FlatUnion<MapNameToDisplayComp<T>>[];

	// TODO: Will comment this later. Basically maps header[number]["name"] as key for new data entry, where the value is either typeof displayComp prop or a string
	type MapNameToDisplayComp<T extends readonly { name: string; displayComp?: unknown }[]> = {
		[K in keyof T]: {
			readonly [P in T[K]['name']]: T[K]['displayComp'] extends ConstructorOfATypedSvelteComponent
				? ConstructorParameters<T[K]['displayComp']>[number]['props']
				: string;
		};
	}[number];
	export let urlCb: (id: string) => string = (id: string) => `/${id}`;
</script>

<Table>
	<thead>
		<tr>
			{#each header as head}
				<Th {...head} />
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data as row}
			<tr>
				{#each header as { name, displayComp }}
					<Td href={'id' in row && typeof row.id === 'string' ? urlCb(row.id) : undefined}>
						<span class="text-lg">
							{#if displayComp}
								<!-- FIXME: This should be correct. -->
								<svelte:component this={displayComp} {...row[name]} />
							{:else}
								{row[name]}
							{/if}
						</span>
					</Td>
				{/each}
			</tr>
		{/each}
	</tbody>
</Table>
