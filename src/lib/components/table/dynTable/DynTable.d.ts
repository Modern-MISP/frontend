/**
 * Just a workaround to be able to extends from any type with "<>" inside of the generics="" attribute inside of the svelte component.
 */
declare type IRecord = Record<string, unknown>;
