<script lang="ts">
	export let placeholder: string;
	export let name = 'default';
	export let value = '';

	let clazz = '';
	export { clazz as class };
</script>

<label class="relative flex items-center gap-2 px-2 py-2 bg-crust text-text rounded-lg {clazz}">
	<slot name="icon" />
	<slot />
	<input
		type="text"
		id={name}
		{placeholder}
		{name}
		bind:value
		on:blur
		on:focus
		class="w-full placeholder-transparent rounded-lg outline-none bg-inherit peer"
	/>
	<label
		for={name}
		class="rounded-md absolute bg-inherit px-2 -top-3 left-2 text-sm transition-all
			peer-placeholder-shown:text-text peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2
			peer-focus:-top-3 peer-focus:text-sm peer-focus:text-inherit peer-focus:left-2 peer-focus-within:translate-y-0"
		class:peer-placeholder-shown:left-9={$$slots.icon}
	>
		{placeholder}</label
	>

	<slot name="suffix" />
</label>
