<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.events.length > 0}
	<table class="table-auto text-xs">
		<tr class="border-b font-medium dark:border-neutral-500">
			{#each Object.keys(data.events[0]) as title}
				<td class="border-r px-6 py-4 dark:border-neutral-500">{title}</td>
			{/each}
		</tr>

		{#each data.events as event}
			<tr class="border-b dark:border-neutral-500">
				{#each Object.values(event) as value}
					<td class="border-r px-6 py-4 dark:border-neutral-500">{JSON.stringify(value)}</td>
				{/each}
			</tr>
		{/each}
	</table>
{:else}
	Noch keine Events vorhanden
{/if}
