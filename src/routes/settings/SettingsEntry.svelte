<script lang="ts">
	export let label: string;
</script>

<label
	class="relative inline-flex items-center cursor-pointer justify-between w-full rounded-md bg-base p-3 my-1"
>
	<span class="font-medium select-none">{label}</span>

	<slot />
</label>
