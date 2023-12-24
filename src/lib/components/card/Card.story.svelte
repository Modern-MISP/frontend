<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import { themes } from '$lib/stores';
  import Card from './Card.svelte';
  import CardRow from './CardRow.svelte';
  import Icon from '@iconify/svelte';
  import Boolean from '../boolean/Boolean.svelte';
  export let Hst: Hst;

  let theme = 'macchiato';
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>

  <div class={theme}>
    <Hst.Variant title="default">
      <Card>
        <h1 class="text-xl font-medium underline">Card Title</h1>
        <body>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, vel? Suscipit ipsam, totam
          explicabo deserunt exercitationem, molestiae sit unde aut dolores magni accusamus porro
          est dicta, incidunt illo earum nobis?
        </body>
      </Card>
    </Hst.Variant>
    <Hst.Variant title="card with rows">
      <Card>
        <CardRow>
          <span> Some element </span>
          <Icon icon="mdi:home" />
        </CardRow>
        <CardRow>
          <span>Some boolean value</span>
          <Boolean />
        </CardRow>
        <CardRow>
          <span>Some boolean value</span>
          <Boolean isTrue={false} />
        </CardRow>
      </Card>
    </Hst.Variant>
  </div>
</Hst.Story>
