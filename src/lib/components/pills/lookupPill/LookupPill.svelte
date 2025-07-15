<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Pill from '../pill/Pill.svelte';

  interface Props {
    /**
     * The index corresponding to the entry in the `options` array.
     */
    value?: number;
    /**
     * Array with props of {@link Pill}s, indexed by `value`.
     */
    options: ComponentProps<Pill>[];
    class?: string;
  }

  let { value = 0, options, class: clazz = '' }: Props = $props();
  /**
   * The class of the pill.
   */
</script>

<!--
  @component
  Converts the value given by the `value` prop to an entry from the `options` lookup array and displays the result as a pill.
 -->

<Pill {...options[value]} class="{clazz} w-max" />
