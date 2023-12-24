<script lang="ts">
  export let href: string | undefined = undefined;
</script>

<a class="border-t-[1px] border-text h-full table-cell" {href}>
  <div class="p-4">
    <slot />
  </div>
</a>
