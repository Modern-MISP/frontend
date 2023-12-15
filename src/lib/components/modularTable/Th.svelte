<script lang="ts">
  import Icon from '@iconify/svelte';

  export let value: string;
  export let icon: string;

  export let clazz = '';
  export { clazz as class };
</script>

<th class="sticky top-0 bg-surface1 {clazz}">
  <div class="flex items-center gap-2 p-6 text-xl">
    <Icon {icon} />
    <span>
      {value}
    </span>
  </div>
</th>
