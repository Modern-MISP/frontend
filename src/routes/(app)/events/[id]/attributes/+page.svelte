<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { api } from '$lib/api/index.js';
  import type { components } from '$lib/api/misp.js';
  import Info from '$lib/components/info/Info.svelte';
  import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
  import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
  import Pill from '$lib/components/pills/pill/Pill.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
  import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups.js';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface.js';
  import { shouldTextBeBlack } from '$lib/util/color.util.js';
  import { notifySave } from '$lib/util/notifications.util.js';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

  export let data;

  $: tableData = [...data.event.Attribute!, ...data.event.Object!.flatMap((o) => o.Attribute!)];

  type Data = (typeof tableData)[number] & {
    Tag?: (components['schemas']['Tag'] & {
      relationship_type?: string;
      local?: boolean;
    })[];
  };

  const col = createTableHeadGenerator<Data, DynTableHeadExtent>();
  const header = [
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => x.id ?? 'unknown'
    }),
    col({
      icon: 'mdi:share',
      key: 'distribution',
      label: 'Distribution',
      value: (x) => ({
        display: LookupPill,
        props: {
          value: +(x.distribution ?? 0),
          options: DISTRIBUTION_LOOKUP
        }
      })
    }),
    col({
      icon: 'mdi:circle',
      key: 'category',
      label: 'Category',
      value: (x) => ({
        display: Pill,
        props: {
          text: x.category
        }
      })
    }),
    col({
      icon: '',
      key: 'type',
      label: 'Type',
      value: (x) => x.type ?? ''
    }),
    col({
      icon: 'mdi:circle',
      key: 'value',
      label: 'Value',
      value: (x) => ({
        display: Info,
        props: { text: x.value, class: 'max-w-xs overflow-hidden text-ellipsis' }
      })
    }),
    col({
      icon: 'mdi:comment',
      key: 'comment',
      label: 'Comment',
      value: (x) => x.comment ?? 'text'
    }),
    col({
      key: 'object_id',
      label: 'Object ID',
      icon: 'mdi:format-list-group',
      value: (x) => x.object_id ?? ''
    }),

    col({
      icon: '',
      key: 'object_relation',
      label: 'Object Relation',
      value: (x) => x.object_relation ?? ''
    }),
    col({
      icon: 'mdi:clock-outline',
      key: 'date',
      label: 'Date',
      value: (x) => ({
        display: DatePill,
        props: {
          date: x.timestamp ? new Date(+x.timestamp * 1000) : new Date()
        }
      })
    }),
    col({
      icon: 'mdi:tag',
      key: 'tags',
      label: 'Tags',
      value: (x) => ({
        display: PillCollection,
        props: {
          pills: (x.Tag ?? []).map((y) => ({
            icon: y.local ? 'mdi:cloud-off-outline' : 'mdi:earth',
            label: y.relationship_type ? y.relationship_type : undefined,
            text: y.name,
            style: `background-color: ${y.colour}; color: ${
              shouldTextBeBlack(y.colour!) ? 'black' : 'white'
            }`
          }))
        }
      })
    })
  ];

  const topMenuActions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:flag-plus',
      label: 'Add',
      action: `/events/${data.event.id}/attributes/new`
    }
  ];

  const editActions: DynCardActionHeader<Data[]>[] = [
    {
      label: 'Delete Attribute',
      icon: 'mdi:delete-outline',
      class: 'text-red',
      action: (attributes) => {
        notifySave(
          Promise.all(
            attributes.map((attribute) =>
              $api
                .DELETE('/attributes/delete/{attributeId}', {
                  params: { path: { attributeId: attribute.id! } }
                })
                .then((resp) => {
                  if (resp.error) throw new Error(resp.error.message);
                  invalidateAll();
                })
            )
          ),
          'Deleted attributes ' + attributes.map((attribute) => attribute.id).join(', ')
        );
      }
    }
  ];
</script>

<ComplexTableLayout
  {tableData}
  {header}
  tableHref={(row) => `/attributes/${row.id}`}
  {editActions}
  filter={[]}
  {topMenuActions}
  groupInfo={(x) => (x.object_id === '0' ? undefined : `Object: ${x.object_id}`)}
></ComplexTableLayout>
