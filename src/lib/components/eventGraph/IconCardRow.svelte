<script lang="ts">
  import CardRow from '$lib/components/card/CardRow.svelte';
  import Icon from '@iconify/svelte';

  /**
   * The icon to be displayed in this row.
   */
  export let icon: string;

  /**
   * The text to be displayed in this row.
   */
  export let text: string;
</script>

<CardRow class="!justify-start gap-2 bg-surface1 p-2 rounded-md">
  <Icon {icon} />
  {text}
</CardRow>
