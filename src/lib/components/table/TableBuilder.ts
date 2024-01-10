import type { ITableHead } from '$lib/models/ITableHead.interface';
import type { SvelteComponent } from 'svelte';

/**
 * Generates a function wich with you can create table head entries. Each entry must have a key and a label. Optionally you can add a display component. If you provide a display component the value function must return the props for the display component. If you don't provide a display component the value function must return a string.
 * Additionally you can extends the table head entry with your own properties by passing the type in as the "E" generic. You also should pass the data you want to display in the table as the "T" generic.
 *
 * That way you will create an object where the key maps to a value that will be displayable by the component you provided in the display property.
 *
 * @example
 * const col = createTableHeadGenerator<typeof TEST_DATA>();
 * const a = col({
 *   key: 'name',
 *   label: 'Name',
 *   display: Info,
 *   value: (value) => ({ text: value.name })
 * });
 *  const b = row({
 *   key: 'name',
 *   label: 'Name',
 *   value: (value) => "needs to be a string"
 * });
 *  * @example
 * const col = createTableHeadGenerator<typeof TEST_DATA, {icon: string}>();
 * const a = col({
 *   key: 'name',
 *   label: asdf
 *   icon: 'mdi:information-outline',
 *   display: Info,
 *   value: (value) => ({ text: value.name })
 * });
 *
 *
 * @returns A function that will create a table head object with the correct types.
 */
export function createTableHeadGenerator<
  T,
  E extends Record<string, unknown> = Record<string, unknown>
>() {
  function createTableHead<K extends SvelteComponent | undefined = undefined>(
    tableHead: ITableHead<T, K> & E
  ) {
    return tableHead;
  }
  return createTableHead;
}
