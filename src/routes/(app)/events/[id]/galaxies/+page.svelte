<script lang="ts">
  import Card from '$lib/components/card/Card.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';

  /**
   *
   */
  export let data;
</script>

<Card class="h-full ">
  {#each data.event?.Galaxy ?? [] as galaxy}
    <div>
      <h1 class="text-xl text-center text-sky text-bold">{galaxy.name}</h1>
      <hr />
      <br />
      <PillCollection
        pills={galaxy.GalaxyCluster
          ? galaxy.GalaxyCluster.map((y) => ({
              icon: y.local ? 'mdi:cloud-off-outline' : 'mdi:earth',
              label: y.relationship_type ? y.relationship_type : undefined,
              text: y.value
            }))
          : []}
      />
    </div>
  {/each}
</Card>
