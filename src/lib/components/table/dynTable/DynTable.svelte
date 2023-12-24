<script lang="ts" generics=" T extends readonly HeaderEntry[] ">
  import { sortBy } from 'lodash-es';

  import Td from '../../table/modularTable/Td.svelte';

  import type { FlatUnion } from '$lib/util/ts.util';

  import Table from '../../table/modularTable/Table.svelte';
  import Th from '../../table/modularTable/Th.svelte';

  export let header: T;
  export let data: FlatUnion<MapNameToDisplayComp<T>>[];

  export let urlCb: (id: string) => string | undefined = (id: string) => undefined;

  // TODO: Will comment this later. Basically maps header[number]["name"] as key for new data entry, where the value is either typeof displayComp prop or a string
  type MapNameToDisplayComp<T extends readonly { name: string; displayComp?: unknown }[]> = {
    [K in keyof T]: {
      readonly [P in T[K]['name']]: T[K]['displayComp'] extends ConstructorOfATypedSvelteComponent
        ? ConstructorParameters<T[K]['displayComp']>[number]['props']
        : string;
    };
  }[number];
</script>

<Table>
  <thead>
    <tr>
      {#each header as head}
        <Th
          {...head}
          on:click={() => {
            data = sortBy(data, (x) => x[head.name].text);
          }}
        />
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each data as row}
      <tr class="hover:bg-sky">
        {#each header as { name, displayComp }}
          <Td href={'id' in row && typeof row.id === 'string' ? urlCb(row.id) : undefined}>
            <span class="text-lg">
              {#if displayComp}
                <!-- FIXME: This should be correct. -->
                <svelte:component this={displayComp} {...row[name]} />
              {:else}
                {row[name]}
              {/if}
            </span>
          </Td>
        {/each}
      </tr>
    {/each}
  </tbody>
</Table>
