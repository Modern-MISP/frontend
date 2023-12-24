<script lang="ts">
  import Pill from '../pill/Pill.svelte';

  /**
   * The distribution number of the the event.
   * - 0: Your organization only
   * - 1: This community only
   * - 2: Connected communities
   * - 3: All communities
   * - 4: Sharing group
   * - 5: Inherit Event
   *
   */
  export let distribution: number = 0;
  const numberLookUp = [
    {
      text: 'Your organization only',
      icon: 'mdi:circle'
    },
    {
      text: 'This community only',
      icon: 'mdi:circle'
    },
    {
      text: 'Connected communities',
      icon: 'mdi:circle'
    },
    {
      text: 'All communities',
      icon: 'mdi:circle'
    },
    {
      text: 'Sharing group',
      icon: 'mdi:circle'
    },
    {
      text: 'Inherit Event',
      icon: 'mdi:circle'
    }
  ];
</script>

<!-- 
  @component
  Converts a distribution number to the equivalent text. Uses the {@link Pill} component to display the text and icon
 -->

<Pill {...numberLookUp[distribution]} />
