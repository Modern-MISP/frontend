import { isObject, mapValues } from 'lodash-es';
/**
 * get the type of any object. Also works deep on any objects.
 * @param obj any object
 * @returns the type of that object. Objects and arrays are mapped deep
 */
export const getTypeDeep = (obj: unknown): unknown =>
  isObject(obj) ? mapValues(obj, (v: unknown) => getTypeDeep(v)) : typeof obj;
