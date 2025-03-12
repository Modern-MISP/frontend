<script lang="ts" generics="T">
  import CardHeading from '../CardHeading.svelte';

  import { type Readable } from 'svelte/store';
  import type { TableHead } from '$lib/models/TableHead.interface';
  import Card from '$lib/components/card/Card.svelte';
  import DynCardContent from '$lib/components/card/dynCard/DynCardContent.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

  let clazz = '';
  /**
   * Additional classes to be applied to this component.
   */
  export { clazz as class };

  /**
   * The header of the table. Also includes the icon and the href.
   */
  export let header: Readable<TableHead<T>>[];
  /**
   * The data that will be displayed in the table.
   */
  export let data: T;
  /**
   * The titel of the card.
   */
  export let title: string = '';
  /**
   * The description of the card.
   */
  export let description: string = '';
</script>

<!-- 
  @component
  A card that displays the data of the given header.

  This works dynamically similar to the {@link DynTable} component. So you should probably use the [`createTableHeadGenerator`](../dynRendering.md#createtableheadgenerator) util function to create the header.
 -->

<Card class="relative gap-4 {clazz}">
  {#if title != ''}
    <CardHeading>{title}</CardHeading>
    <span class="">{description}</span>
    <!--    <br /> -->
    <!--    <p></p> -->
  {/if}
  <slot name="before" />
  <DynCardContent {data} {header} />
  <slot name="after" />
</Card>
