<script lang="ts">
  import Icon from '@iconify/svelte';

  export let label: string | undefined = undefined;
  export let text = '';
  export let icon: string | undefined = undefined;

  let clazz = '';
  export { clazz as class };

  export let style = '';
</script>

<!-- TODO: Refactor -->
<div
  class="flex items-center gap-2 rounded-lg bg-surface1 text-text w-fit overflow-hidden {clazz}"
  {style}
>
  {#if icon && !label}
    <div class="flex items-center gap-1 py-1 pl-2">
      <Icon {icon} />
    </div>
  {/if}
  {#if label}
    <div class="flex items-center gap-1 px-2 py-1 bg-crust">
      {#if icon}
        <Icon {icon} />
      {/if}
      {label}
    </div>
  {/if}
  <span class="px-2 py-1 pl-0 line-clamp-1">
    <slot>
      {text}
    </slot>
  </span>
</div>
