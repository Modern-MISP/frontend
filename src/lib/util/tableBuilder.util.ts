import type { TableHead } from '$lib/models/TableHead.interface';
import { mode } from '$lib/stores';
import type { SvelteComponent } from 'svelte';
import { derived } from 'svelte/store';

/**
 * ## What does this do?
 * Generates a function wich with you can create table head entries. Each entry must have  a label. Optionally you can add a display component. If you provide a display component the value function must return the props for the display component. If you don't provide a display component the value function must return a string.
 * Additionally you can extends the table head entry with your own properties by passing the type in as the "E" generic. You also should pass the type you want to provide to any column as the "T" generic.
 *
 * That way you will create an object where the key maps to a value that will be displayable by the component you provided in the display property.
 * ## Why use this?
 * If you want to use any dynamic component like the {@link DynTable} or {@link DynCard} you can use this function to ensure typesafty.
 *
 * ## How to use this?
 *
 * @example
 * const col = createTableHeadGenerator<typeof TEST_DATA[number]>();
 * const a = col({
 *   label: 'Name',
 *   display: Info,
 *   value: (value) => ({ text: value.name })
 * });
 *  const b = col({
 *   label: 'Name',
 *   value: (value) => "needs to be a string"
 * });
 * const header = [a, b];
 *
 * // Inside of a component:
 * <DynTable {header} data={TEST_DATA} />
 *
 *  * @example
 * const col = createTableHeadGenerator<typeof TEST_DATA, {icon: string}>();
 * const a = col({
 *   label: asdf
 *   icon: 'mdi:information-outline',
 *   display: Info,
 *   value: (value) => ({ text: value.name })
 * });
 *
 * @template T The type of the data that will be displayed in one entry. E.G. if you use the DynTable your data is Probably an array. So this should ne (typeof DATA)[number] => One element of the array.
 * @template E The type of the additional properties that are necessary for one table head entry.
 * @returns A function that will create a table head object with the correct types.
 */
export function createTableHeadGenerator<
  T,
  E extends Record<string, unknown> = Record<string, unknown>
>() {
  function createTableHead<K extends SvelteComponent | undefined = undefined>(
    tableHead: TableHead<T, K> & E
  ) {
    return tableHead;
  }
  return createTableHead;
}

export function createTableHeadGenerator2<T>() {
  return function <
    K extends SvelteComponent | undefined = undefined,
    L extends SvelteComponent | undefined = undefined
  >(view: TableHead<T, K>, edit: Partial<TableHead<T, L>> = {}) {
    return derived(mode, (m) => (m === 'edit' ? { ...view, ...edit } : view));
  };
}
