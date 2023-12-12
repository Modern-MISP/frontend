<script lang="ts">
	export let placeholder: string;

	import SearchIcon from 'svelte-material-icons/Magnify.svelte';
	export let name = 'default';
</script>

<label class="relative flex items-center gap-2 px-2 py-2 bg-red-200 rounded-lg x">
	<slot name="icon" />
	<slot />
	<input
		type="text"
		{placeholder}
		{name}
		class="w-full placeholder-transparent rounded-lg outline-none bg-inherit peer"
	/>
	<label
		for={name}
		class="rounded-md absolute bg-inherit dark:bg-dark px-2 -top-3 left-2 text-sm transition-all text-gray-400 dark:text-gray-300
			peer-placeholder-shown:text-base peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2
			peer-focus:-top-3 peer-focus:text-sm peer-focus:text-inherit peer-focus:left-2 peer-focus-within:translate-y-0
			"
		class:peer-placeholder-shown:left-9={$$slots.default}
	>
		{placeholder}</label
	>

	<slot name="suffix" />
</label>
