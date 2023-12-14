<script lang="ts">
	export let href: string | undefined = undefined;
</script>

<td>
	{#if href}
		<a {href}>
			<div class="p-4">
				<slot />
			</div>
		</a>
	{:else}
		<div class="p-4">
			<slot />
		</div>
	{/if}
</td>
