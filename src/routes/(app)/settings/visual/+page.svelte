<script lang="ts">
  import { lockEditMode } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { mode } from '$lib/stores';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import { notifySave } from '$lib/util/notifications.util';
  import { api } from '$lib/api';
  import { settings } from '$lib/stores';
  import { compatibility } from '$lib/stores';
  import { invalidateAll } from '$app/navigation';

  $mode = 'edit';

  /**
   * Page data containing visual information about the users preferences.
   */
  export let data;

  function mapThemeToNumber(theme: string) {
    switch (theme) {
      case 'mocha':
        return 0;
      case 'macchiato':
        return 1;
      case 'frappe':
        return 2;
      case 'latte':
        return 3;
      case 'latte lighter':
        return 4;
      case 'latte bright':
        return 5;
      default:
        return 0;
    }
  }
  function mapNumberToTheme(theme_id: number) {
    switch (theme_id) {
      case 0:
        return 'mocha';
      case 1:
        return 'macchiato';
      case 2:
        return 'frappe';
      case 3:
        return 'latte';
      case 4:
        return 'latte lighter';
      case 5:
        return 'latte bright';

      default:
        return 'mocha';
    }
  }
  function makeBool(str: string | boolean) {
    if (typeof str == 'boolean') {
      return str;
    }
    if (str == 'true') {
      return true;
    }
    return false;
  }
  $: ({ header, title, description } = data);
  async function editCallback(formData: Record<string, string>) {
    $settings.theme = mapNumberToTheme(mapThemeToNumber(formData.theme));
    $settings.openOnInit = makeBool(formData.is_menu_open);
    if (!compatibility) {
      notifySave(
        $api
          .POST('/user_settings/setSetting/me/visual_setting', {
            body: { value: [mapThemeToNumber(formData.theme), formData.is_menu_open] }
          })
          .then((resp) => {
            if (resp.error) {
              // throw new Error(resp.error.message);
              // @ts-expect-error MISP API return custom errors object
              const mispErrors: string[] = Object.values(resp.error.errors ?? {});
              throw new Error(mispErrors.length ? mispErrors[0] : resp['error']['detail']);
            }
          })
      );
    }
    invalidateAll();
  }

  const Export: ActionBarEntryProps[] = [
    {
      icon: 'mdi:download',
      label: 'Export',
      action: () => {
        console.log('YAY');
      }
    }
  ];
</script>

<svelte:window use:lockEditMode={true} />

<!-- 
    @component
    Displays the visual information settings page.
 -->
<Form callback={editCallback} additionalActions={Export}>
  <DynCard {header} data={{}} {title} {description}></DynCard>
</Form>
