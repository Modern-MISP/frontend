<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type Select from '$lib/components/form/Select.svelte';

  interface Props {
    /**
     * The label of the settings entry.
     */
    label: string;
    children?: import('svelte').Snippet;
  }

  let { label, children }: Props = $props();
</script>

<!--
  @component
  Represents a single settings entry on [`/settings`](pages.md#/settings).

  @slot The component/html (e.g. a {@link Checkbox} or {@link Select} to display in the entry.


-->
<label
  class="relative inline-flex items-center justify-between w-full p-6 my-1 rounded-md cursor-pointer bg-ctp-surface0"
>
  <span class="font-medium select-none">{label}</span>

  {@render children?.()}
</label>
