<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Access to my user data</h1>
<pre>
	{JSON.stringify(data.myuser, null, 2)}
</pre>
