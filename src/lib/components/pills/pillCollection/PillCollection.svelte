<script lang="ts" generics="T extends PillProps">
  import Pill from '$lib/components/pills//pill/Pill.svelte';
  import type { SvelteComponent, ComponentType } from 'svelte';

  /**
   * The Pills that should be displayed.
   */
  export let pills: T[];

  /**
   * The pill component to be used for each pill.
   */
  export let base: ComponentType<SvelteComponent<T>> = Pill as PillProps;

  let clazz: string = '';
  /**
   * The class of the pill wrapper.
   */
  export { clazz as class };
</script>

<!-- 
  @component
  Displays a collection of pills. The pill component that should be used for each pill can be specified by setting the `base` prop.
 -->

<div class="flex flex-wrap gap-2 {clazz}">
  {#each pills as pill}
    <svelte:component this={base} {...pill} />
  {/each}
</div>
