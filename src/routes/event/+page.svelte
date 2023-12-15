<script>
	import { goto } from '$app/navigation';

	goto('/event/list', { replaceState: true });
</script>

<div class="flex flex-col gap-4 text-sky">
	<a href="/event/edit">Edit</a>
	<a href="/event/view">View</a>
</div>
