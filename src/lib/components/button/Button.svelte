<script lang="ts">
	let clazz = '';
	export { clazz as class };
</script>

<button
	on:click
	class="flex justify-between p-4 rounded-md bg-crust w-full items-center text-white text-lg font-bold {clazz}"
>
	<slot />
</button>
