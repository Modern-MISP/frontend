<script lang="ts">
  import { run, createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import { createEventDispatcher } from 'svelte';

  interface Props {
    /**
     * Whether the checkbox is checked or not.
     */
    checked: boolean;
    /**
     * The form name of this checkbox.
     */
    name?: string | undefined;
    /**
     * If true, the checkbox can't be toggled.
     */
    disabled?: boolean;
  }

  let { checked = $bindable(), name = undefined, disabled = false }: Props = $props();

  const dispatch = createEventDispatcher<{ formValue: Record<string, boolean> }>();
  run(() => {
    if (name) dispatch('formValue', { [name]: checked });
  });
</script>

<!--
  @component
  A checkbox component.
  In order to receive changes, the `checked` prop can be reactively bound or
  the `on:change` event can be listened to for changes.

  @internal
  Uses some tailwind css trickery to make the checkbox value to look like a switch.
  Basically hides the input and sets the focus state via the label.
  The div is the actual switch and is moved via the peer-checked class where the peer class is set in the input.

 -->

<label class="relative flex cursor-pointer">
  <input type="checkbox" {disabled} bind:checked onchange={bubble('change')} class="sr-only peer" />
  <!-- To support boolean as form response => Checkbox would evaluate to "on" if set and nothing if not set -->
  <input type="hidden" bind:value={checked} {name} />
  <div
    class="w-11 h-6 bg-ctp-crust rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-ctp-text after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ctp-main peer-checked:dark:bg-ctp-sky transition-colors"
  ></div>
</label>
