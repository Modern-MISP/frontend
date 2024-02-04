<script lang="ts">
  import Icon from '@iconify/svelte';

  /**
   * The icon of this entry
   */
  export let icon: string;
  /**
   * The text of this entry
   */
  export let text: string;

  /**
   * Is this entry active. You should bind to this
   */
  export let active = false;
</script>

<button
  class="flex flex-col items-center gap-2 p-4 w-min"
  on:click={() => (active = !active)}
  class:text-sky={active}
>
  <Icon {icon} class="text-2xl" />
  <span class="text-sm">{text}</span>
</button>
