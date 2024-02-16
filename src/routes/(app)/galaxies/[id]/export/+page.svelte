<script lang="ts">
  import { page } from '$app/stores';
  import { lockEditMode } from '$lib/actions';
  import { api } from '$lib/api';
  import Button from '$lib/components/button/Button.svelte';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import Select from '$lib/components/form/Select.svelte';
  import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';
  import { currentRoute, mode, notifications } from '$lib/stores';
  import { errorPill, successPill } from '$lib/util/pill.util';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

  $mode = 'edit';

  let downloadURL: string | null = null;

  const col = createTableHeadGenerator<null>();

  $: $currentRoute = [
    ...($currentRoute ?? []),
    {
      name: 'Export Galaxy',
      href: 'export',
      icon: 'mdi:export'
    }
  ];

  const header = [
    col(
      {
        label: 'Include default clusters',
        value: () => ''
      },
      {
        value: () => ({
          display: Checkbox,
          props: {
            name: 'default',
            checked: true
          }
        })
      }
    ),
    col(
      {
        label: 'Include custom clusters',
        value: () => ''
      },
      {
        value: () => ({
          display: Checkbox,
          props: {
            name: 'custom',
            checked: false
          }
        })
      }
    ),
    col(
      {
        label: 'Distribution',
        value: () => ''
      },
      {
        value: () => ({
          display: Select,
          props: {
            name: 'distribution',
            value: '3', // All communities
            options: DISTRIBUTION_LOOKUP.map((d, i) => ({
              value: i.toString(),
              label: d.text ?? 'unknown'
            }))
          }
        })
      }
    ),
    col(
      {
        label: 'Format',
        value: () => ''
      },
      {
        value: () => ({
          display: Select,
          props: {
            name: 'format',
            value: 'default',
            options: [
              { value: 'default', label: 'default' },
              { value: 'misp-galaxy', label: 'misp-galaxy' }
            ]
          }
        })
      }
    ),
    col(
      {
        label: 'Download result',
        value: () => ''
      },
      {
        value: () => ({
          display: Checkbox,
          props: {
            name: 'download',
            checked: true
          }
        })
      }
    )
  ];

  function onExport(formData: Record<string, string>) {
    $api
      .POST('/galaxies/export/{galaxyId}', {
        params: { path: { galaxyId: $page.params.id } },
        body: { Galaxy: formData }
      })
      .then(async (result) => {
        if (result.error) {
          notifications.add(errorPill(result.error.message));
          return;
        }
        notifications.add(successPill('exported'));
        const blob = await result.response.blob();
        const blobURL = window.URL.createObjectURL(blob);
        if (formData.download) {
          downloadURL = blobURL;
        } else {
          window.open(blobURL, '_blank');
        }
      });
  }
</script>

<!--
  @component
  
  Page for exporting a galaxy.
-->
<svelte:window use:lockEditMode={true} />
<Form callback={onExport}>
  <DynCard {header} data={null} />
</Form>
{#if downloadURL !== null}
  <a href={downloadURL} download={`galaxy_${$page.params.id}.json`} class="w-fit"
    ><Button>Download</Button></a
  >
{/if}
