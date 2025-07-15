<script lang="ts">
  import { fly } from 'svelte/transition';
  import IconCard from '../cards/IconCard.svelte';
  import IconCardRow from '../cards/IconCardRow.svelte';
  import type { components } from '$lib/api/misp';
  import { appState } from '$lib/stores.svelte.ts';

  interface Props {
    /**
     *
     */
    objects: components['schemas']['Object'][];
    /**
     *
     */
    attributes: components['schemas']['Attribute'][];
  }

  let { objects, attributes }: Props = $props();

  const onDragStart = (event: DragEvent, node: unknown, type: string) => {
    if (appState.mode !== 'edit' || !event.dataTransfer) {
      return;
    }

    event.dataTransfer.setData('type', type);
    const nodeString = JSON.stringify(node);
    event.dataTransfer.setData('node', nodeString);
    event.dataTransfer.effectAllowed = 'move';
  };

  let showUnreferencedObjects = $state(false);
  let showUnreferencedAttributes = $state(false);

  function toggleUnreferencedObjects() {
    showUnreferencedObjects = !showUnreferencedObjects;
    showUnreferencedAttributes = false;
  }

  function toggleUnreferencedAttributes() {
    showUnreferencedAttributes = !showUnreferencedAttributes;
    showUnreferencedObjects = false;
  }
</script>

<!--
  @component
    A custom sidemenu to display unreferenced objects and attributes.
    Allows to drag and drop nodes.

 -->

<aside>
  <IconCardRow>
    <IconCard icon="mdi:web" text="Unreferenced Objects" on:click={toggleUnreferencedObjects} />
    <IconCard
      icon="mdi:flag"
      text="Unreferenced Attributes"
      on:click={toggleUnreferencedAttributes}
    />
  </IconCardRow>
  <div class="flex flex-row">
    {#if showUnreferencedObjects}
      <div
        in:fly={{ x: 200 }}
        out:fly={{ x: 200 }}
        class="w-full max-h-96 overflow-y-auto overflow-x-hidden absolute z-10"
      >
        <div class="flex flex-col rounded-lg bg-ctp-surface0">
          {#each objects as object}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="object-node node"
              ondragstart={(event) => onDragStart(event, { data: object }, 'object')}
              draggable={true}
            >
              <IconCard
                icon="mdi:web"
                text={object.name + ': ' + object.comment}
                class="flex flex-row!"
              ></IconCard>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if showUnreferencedAttributes}
      <div
        in:fly={{ x: 200 }}
        out:fly={{ x: 200 }}
        class="w-full max-h-96 overflow-y-auto overflow-x-hidden absolute z-10"
      >
        <div class="flex flex-col rounded-lg bg-ctp-surface0">
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          {#each attributes as attribute}
            <div
              class="attribute-node node"
              ondragstart={(event) => onDragStart(event, { data: attribute }, 'attribute')}
              draggable={true}
            >
              <IconCard
                icon="mdi:flag"
                text={attribute.type + ': ' + attribute.value}
                class="flex flex-row!"
              ></IconCard>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</aside>
