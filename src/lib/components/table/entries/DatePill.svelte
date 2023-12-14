<script lang="ts">
	import { addWeeks, format, isAfter } from 'date-fns';
	import Pill from './Pill.svelte';
	import { DATE_FORMAT } from '$lib/components/config';

	export let date: Date;
	const today = new Date();

	function getClass(date: Date) {
		if (isAfter(today, date)) return '!text-red';
		if (isAfter(addWeeks(date, -1), today)) return '!text-green';
		return '!text-peach';
	}
</script>

<Pill icon="mdi:clock" class={getClass(date)}>
	{format(date, DATE_FORMAT)}
</Pill>
