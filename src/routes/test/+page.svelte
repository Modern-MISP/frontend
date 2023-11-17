<script lang="ts">
	import { GET, POST } from '$lib/api';
	import { onMount } from 'svelte';

	onMount(async () => {
		const {
			data,
			error: mispError,
			response
		} = await POST('/attributes/add/{eventId}', {
			params: { path: { eventId: '1' } },
			body: {
				disable_correlation: false,
				type: 'bic',
				value: 'as',
				comment: 'asdf'
			}
		});
		console.log(data);
	});
</script>
