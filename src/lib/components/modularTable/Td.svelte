<script lang="ts">
	export let href: string | undefined = undefined;
</script>

<td class="border-t-[1px] border-text h-full">
	{#if href}
		<a {href} class="h-full">
			<div class="h-full p-4">
				<slot />
			</div>
		</a>
	{:else}
		<div class="p-4">
			<slot />
		</div>
	{/if}
</td>
