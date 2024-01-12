<script lang="ts">
  /**
   * Whether the checkbox is checked or not.
   */
  export let checked: boolean;
  /**
   * The form name of this checkbox.
   */
  export let name: string | undefined = undefined;
</script>

<!-- 
  @component
  A checkbox component.
  You should bind to the checked property, to access the value.
  You could also use the on:change event to listen for changes.

  @internal
  Uses some tailwind css trickery to make the checkbox value to look like a switch. 
  Basically hides the input and sets the focus state via the label. the div is the actual switch and is moved via the peer-checked class. Where the peer class is set in the input.

 -->
<label class="relative flex">
  <input type="checkbox" {name} bind:checked on:change class="sr-only peer" />
  <div
    class="w-11 h-6 bg-crust rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-main peer-checked:dark:bg-sky"
  />
</label>
