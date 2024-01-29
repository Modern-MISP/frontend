<script lang="ts">
  import Input from '../input/Input.svelte';
  /**
   * The name of this input array
   */
  export let name: string;

  /**
   * The placeholder of the inputs
   */
  export let placeholder: string;
  /**
   * The amount of inputs
   */
  export let length: number;
  let clazz = '';
  /**
   * The class overload for each input
   */
  export { clazz as class };
</script>

<!--  eslint-disable-next-line @typescript-eslint/no-unused-vars -->
{#each { length } as _}
  <Input {name} {placeholder} class={clazz} />
{/each}
