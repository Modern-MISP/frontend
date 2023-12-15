<script lang="ts">
  export let label: string;
</script>

<label
  class="relative inline-flex items-center justify-between w-full p-6 my-1 rounded-md cursor-pointer bg-surface0"
>
  <span class="font-medium select-none">{label}</span>

  <slot />
</label>
