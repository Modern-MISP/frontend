<script lang="ts">
	import { GET } from '$lib/api';
	const tags = GET('/tags', {});
</script>

<h1>Request to /tags</h1>
{#await tags then value}
	<pre>
        {JSON.stringify(value, null, 2)}
    </pre>
{/await}
