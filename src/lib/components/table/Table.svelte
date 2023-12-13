<script lang="ts" generics="T extends string">
	import Icon from '@iconify/svelte';

	export let header: { name: T; value: string; icon: string }[];

	export let data: Record<T, string>[];
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
				{#each header as { name }}
					<td>
						<span class="text-lg">
							{row[name]}
						</span>
					</td>
				{/each}
			</tr>
		{/each}
	</table>
</div>
