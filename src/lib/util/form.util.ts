export function getFormValues({ currentTarget }: SubmitEvent) {
  if (!(currentTarget && currentTarget instanceof HTMLFormElement))
    throw new Error('Did not trigger on a HTMLFormElement ');
  const data = new FormData(currentTarget);
  const entries = Object.fromEntries(data.entries());
  if (!entries) throw new Error("Forgot to set 'name' attribute");
  return entries;
}
