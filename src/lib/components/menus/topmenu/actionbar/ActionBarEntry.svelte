<script lang="ts">
  import Icon from '@iconify/svelte';

  /**
   * The label of this ActionBar entry.
   */
  export let label: string;

  /**
   * The icon of this ActionBar entry.
   */
  export let icon: string;
</script>

<div class="flex flex-col items-center gap-1">
  <Icon {icon} class="w-6 h-6" />
  <span class="text-xs">{label}</span>
</div>
