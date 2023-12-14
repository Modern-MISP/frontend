<script lang="ts" generics=" T extends readonly HeaderEntry[] ">
	import type { FlatUnion } from '$lib/util/ts.util';
	import Icon from '@iconify/svelte';

	import type { HeaderEntry } from './HeaderEntry.interface';

	export let header: T;
	export let data: FlatUnion<MapNameToDisplayComp<T>>[];

	// Will comment this later. Basically maps header[number]["name"] as key for new data entry, where the value is either typeof displayComp prop or a string
	type MapNameToDisplayComp<T extends readonly { name: string; displayComp?: unknown }[]> = {
		[K in keyof T]: {
			readonly [P in T[K]['name']]: T[K]['displayComp'] extends ConstructorOfATypedSvelteComponent
				? ConstructorParameters<T[K]['displayComp']>[number]['props']
				: string;
		};
	}[number];
</script>

<div class="rounded-lg text-text bg-surface0">
	<table class="border-separate border-spacing-8">
		<tr>
			{#each header as { value, icon }}
				<th>
					<div class="flex items-center gap-2 text-xl">
						<Icon {icon} />
						<span>
							{value}
						</span>
					</div>
				</th>
			{/each}
		</tr>

		{#each data as row}
			<tr class="border-2 border-text">
				{#each header as { name, displayComp }}
					<td>
						<span class="text-lg">
							{#if displayComp}
								<!-- FIXME: This should be correct. -->
								<svelte:component this={displayComp} {...row[name]} />
							{:else}
								{row[name]}
							{/if}
						</span>
					</td>
				{/each}
			</tr>
		{/each}
	</table>
</div>
