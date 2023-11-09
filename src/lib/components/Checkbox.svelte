<script lang="ts">
	export let checked: boolean;
</script>

<div class="relative">
	<input type="checkbox" bind:checked on:change class="sr-only peer" />
	<div
		class="w-11 h-6 bg-crust rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-main peer-checked:dark:bg-sky"
	/>
</div>
