<script lang="ts">
  import { run } from 'svelte/legacy';

  import { goto } from '$app/navigation';
  import { lockEditMode } from '$lib/actions';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { currentRoute, appState } from '$lib/stores.svelte.ts';
  import { notifySave } from '$lib/util/notifications.util';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

  appState.mode = 'edit';

  interface OpenIDProviderFormData {
    name: string;
    base_url: string;
    client_id: string;
    client_secret: string;
    active: boolean;
    org_id: string;
  }

  function editCallback(formData: OpenIDProviderFormData) {
    notifySave(
      $api.POST('/auth/openID/addOpenIDConnectProvider', { body: { ...formData } }).then((resp) => {
        if (resp.error) {
          const mispErrors = resp.error.detail?.map((err) => err.msg) || [
            'An unknown error occurred'
          ];
          throw new Error(mispErrors[0]);
        } else {
          goto(`/admin/OIDConnect/`);
        }
      })
    );
  }

  const col = createTableHeadGenerator<OpenIDProviderFormData>();

  const header = [
    col({
      label: 'Name',
      value: () => ({
        display: Input,
        props: {
          placeholder: 'Name',
          name: 'name',
          icon: 'mdi:watermark'
        }
      })
    }),
    col({
      label: 'Path',
      value: () => ({
        display: Input,
        props: {
          placeholder: 'Path',
          name: 'base_url',
          icon: 'mdi:link-variant'
        }
      })
    }),
    col({
      label: 'Client ID',
      value: () => ({
        display: Input,
        props: {
          placeholder: 'Client ID',
          name: 'client_id',
          icon: 'mdi:account-outline'
        }
      })
    }),
    col({
      label: 'Token',
      value: () => ({
        display: Input,
        props: {
          placeholder: 'Token',
          name: 'client_secret',
          icon: 'mdi:key-outline'
        }
      })
    }),
    col({
      label: 'Active',
      value: () => ({
        display: Checkbox,
        props: {
          name: 'active',
          checked: true
        }
      })
    }),
    col({
      label: 'Organisation',
      value: () => ({
        display: Input,
        props: {
          placeholder: 'Organisation',
          name: 'org_id',
          icon: 'mdi:account-group'
        }
      })
    })
  ];

  run(() => {
    $currentRoute = [
      ...($currentRoute ?? []),
      { name: 'Add Provider', href: 'new', icon: 'mdi:plus-outline' }
    ];
  });
</script>

<svelte:window use:lockEditMode={true} />

<!--
  @component
  Displays a form to add a new OpenID provider.
-->
<Form callback={editCallback}>
  <DynCard {header} data={{}}></DynCard>
</Form>
