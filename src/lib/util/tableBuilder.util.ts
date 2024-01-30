import type { TableHead } from '$lib/models/TableHead.interface';
import { mode } from '$lib/stores';
import type { SvelteComponent } from 'svelte';
import { derived } from 'svelte/store';

/**
 * Generates dynamic, reactive and type-safe `TableHead`s to use in dynamic components like {@link DynCard} and {@link DynTable}.
 * @template T The type of the data that will be displayed per entry.
 * @template E Additional properties that are necessary for a `TableHead` entry.
 *
 * @example
 * const col = createTableHeadGenerator<typeof TEST_DATA[number]>();
 * const header = [
 *   col({
 *     label: 'Name',
 *     value: (x) => ({ display: Info, props: })
 *   }),
 * ];
 *
 * @returns Factory function for generating {@link TableHead}s
 */
export function createTableHeadGenerator<
  T,
  E extends Record<string, unknown> = Record<string, unknown>
>() {
  return function <
    K extends SvelteComponent | undefined = undefined,
    L extends SvelteComponent | undefined = undefined
  >(view: TableHead<T, K> & E, edit: Partial<TableHead<T, L> & E> = {}) {
    return derived(mode, (m) => (m === 'edit' ? { ...view, ...edit } : view));
  };
}
