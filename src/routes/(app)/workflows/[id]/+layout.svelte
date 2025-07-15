<script lang="ts">
  import { SvelteFlowProvider } from '@xyflow/svelte';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<SvelteFlowProvider>{@render children?.()}</SvelteFlowProvider>
