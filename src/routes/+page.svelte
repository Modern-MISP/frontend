<script lang="ts">
	import { GET } from '$lib/api';
	import { onMount } from 'svelte';
	const tags = GET('/tags', {});

	const myuser = fetch('/api/users/me').then((res) => res.json());

	onMount(() => {});
</script>

<h1>Access to my user data</h1>
{#await myuser then value}
	<pre>
        {JSON.stringify(value, null, 2)}
    </pre>
{/await}
