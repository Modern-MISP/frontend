<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import type { ModuleNodeData } from '../workflow';

  /** Data about a module that is part of a workflow. */
  export let data: ModuleNodeData;

  const col = createTableHeadGenerator<ModuleNodeData>();

  const header = [
    col({
      label: 'Module',
      value: (x) => ({
        display: HrefPill,
        props: {
          href: `/workflows/modules/${x.id}`,
          icon: 'material-symbols:package-2-outline',
          text: x.name
        }
      })
    }),
    col({
      label: 'Type',
      value: (x) => x.module_type
    }),
    col({
      label: 'Version',
      value: (x) => x.module_version ?? 'unknown'
    })
  ];
</script>

<DynCard {header} {data} />
