import { uniq } from 'lodash-es';

/**
 * Extracts the name values from a form.
 *
 * @param param0 Any SubmitEvent
 * @returns An array of key value objects that define the form
 */
export function getFormValues({ currentTarget }: SubmitEvent) {
  if (!(currentTarget && currentTarget instanceof HTMLFormElement))
    throw new Error('Did not trigger on a HTMLFormElement ');
  const data = new FormData(currentTarget);

  // Get all name from form
  const keys = uniq([...data.keys()]);
  const entries = keys.map((key) => {
    // Get all values from that name inputs.
    const values = data.getAll(key);
    // Handles arrays. If there are multiple inputs with the same name they most be an array. Elsewise there is only one input. So no need too but it into an array.
    return { [key]: values.length > 1 ? values : values[0] };
  });
  // Throw if no name is set
  if (!entries) throw new Error("Forgot to set 'name' attribute");
  return entries;
}
