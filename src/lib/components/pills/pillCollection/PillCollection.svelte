<script lang="ts" generics="T extends PillProps">
  import Pill from '$lib/components/pills//pill/Pill.svelte';
  import type { SvelteComponent, ComponentType } from 'svelte';

  interface Props {
    /**
     * The Pills that should be displayed.
     */
    pills: T[];
    /**
     * The pill component to be used for each pill.
     */
    base?: ComponentType<SvelteComponent<T>>;
    class?: string;
  }

  let { pills, base = Pill as PillProps, class: clazz = '' }: Props = $props();
  /**
   * The class of the pill wrapper.
   */
</script>

<!--
  @component
  Displays a collection of pills. The pill component that should be used for each pill can be specified by setting the `base` prop.
 -->

<div class="flex flex-wrap gap-2 {clazz}">
  {#each pills as pill}
    {@const SvelteComponent_1 = base}
    <SvelteComponent_1 {...pill} />
  {/each}
</div>
