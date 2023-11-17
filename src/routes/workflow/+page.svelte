<script lang="ts">
	import { Background, BackgroundVariant, MiniMap, SvelteFlow, type Node } from '@xyflow/svelte';
	import { writable } from 'svelte/store';
	import CustomNode from './CustomNode.svelte';

	const nodes = writable<Node[]>([
		{
			id: '1',
			type: 'input',
			data: { label: 'Input Node' },
			position: { x: 0, y: 0 },
			class: '!bg-surface0'
		},
		{
			id: '2',
			data: { label: 'Node' },
			position: { x: 0, y: 150 },
			class: '!bg-overlay0'
		},
		{
			id: '3',
			type: 'output',
			data: { label: 'Not connected' },
			position: { x: 200, y: 250 },
			class: '!bg-surface0'
		},
		{
			id: '4',
			type: 'custom',
			data: { name: 'Tyler Weary', job: 'Designer', emoji: '🤓' },

			position: { x: -200, y: 200 }
		}
	]);

	const edges = writable([
		{
			id: '1-2',
			source: '1',
			target: '2'
		}
	]);

	const nodeTypes = {
		custom: CustomNode
	};
</script>

<SvelteFlow
	{nodes}
	{edges}
	{nodeTypes}
	fitView
	on:nodeclick={(event) => console.log('on node click', event)}
	class="text-text"
>
	<div class="!text-base">
		<Background variant={BackgroundVariant.Dots} class="!bg-base" />
		<MiniMap />
	</div>
</SvelteFlow>

<style lang="postcss">
	:global(:root) {
		--minimap-background-color-props: theme('colors.current');
	}
</style>
