<script lang="ts">
  export let text: string = '';

  export let clazz = '';

  export { clazz as class };
</script>

<div class="p-2 rounded-md bg-surface1 text-text w-fit {clazz}">
  <slot>
    {text}
  </slot>
</div>
