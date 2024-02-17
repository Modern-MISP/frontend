/* eslint-disable @typescript-eslint/no-explicit-any */
export function getReferencedItems(objects: any[], attributes: any[], references: any[]) {
  const referencedItemsIds = extractReferencedItemsIds(references);
  const referencedObjectsIds = filterReferencedObjectsIds(referencedItemsIds);
  const referencedAttributesIds = filterReferencedAttributesIds(referencedItemsIds);

  const referencedObjects = findReferencedObjects(objects, referencedObjectsIds);
  const referencedAttributes = findReferencedAttributes(attributes, referencedAttributesIds);

  const unreferencedObjects = findUnreferencedObjects(objects, referencedObjectsIds);
  const unreferencedAttributes = findUnreferencedAttributes(attributes, referencedAttributesIds);

  return { referencedObjects, referencedAttributes, unreferencedObjects, unreferencedAttributes };
}

function extractReferencedItemsIds(references: any[]) {
  return Array.from(new Set(references.flatMap(({ from, to }) => [from, to])));
}

function filterReferencedObjectsIds(referencedItemsIds: string[]) {
  return referencedItemsIds.filter((id) => id.startsWith('o-'));
}

function filterReferencedAttributesIds(referencedItemsIds: string[]) {
  return referencedItemsIds.filter((id) => !id.startsWith('o-'));
}

function findReferencedObjects(objects: any[], referencedObjectsIds: string[]) {
  return objects.filter(({ id }) => referencedObjectsIds.includes(`o-${id}`));
}

function findReferencedAttributes(attributes: any[], referencedAttributesIds: string[]) {
  return attributes.filter(({ id }) => referencedAttributesIds.includes(id));
}

function findUnreferencedObjects(objects: any[], referencedObjectsIds: string[]) {
  return objects.filter(({ id }) => !referencedObjectsIds.includes(`o-${id}`));
}

function findUnreferencedAttributes(attributes: any[], referencedAttributesIds: string[]) {
  return attributes.filter(({ id }) => !referencedAttributesIds.includes(id));
}
