import type { components } from '$lib/api/misp';
import type { EventGraphReferences } from '$lib/models/EventGraphReferences';

type Objects = components['schemas']['Object'][];
type Attributes = components['schemas']['Attribute'][];
type References = EventGraphReferences['relations'];

export function getReferencedItems(
  objects: Objects,
  attributes: Attributes,
  references: References
) {
  const referencedItemsIds = extractReferencedItemsIds(references);
  const referencedObjectsIds = filterReferencedObjectsIds(referencedItemsIds);
  const referencedAttributesIds = filterReferencedAttributesIds(referencedItemsIds);

  const referencedObjects = findReferencedObjects(objects, referencedObjectsIds);
  const referencedAttributes = findReferencedAttributes(attributes, referencedAttributesIds);

  const unreferencedObjects = findUnreferencedObjects(objects, referencedObjectsIds);
  const unreferencedAttributes = findUnreferencedAttributes(attributes, referencedAttributesIds);

  return { referencedObjects, referencedAttributes, unreferencedObjects, unreferencedAttributes };
}

function extractReferencedItemsIds(references: References) {
  return Array.from(new Set(references.flatMap(({ from, to }) => [from, to])));
}

function filterReferencedObjectsIds(referencedItemsIds: string[]) {
  return referencedItemsIds.filter((id) => id.startsWith('o-'));
}

function filterReferencedAttributesIds(referencedItemsIds: string[]) {
  return referencedItemsIds.filter((id) => !id.startsWith('o-'));
}

function findReferencedObjects(objects: Objects, referencedObjectsIds: string[]) {
  return objects.filter(({ id }) => id && referencedObjectsIds.includes(`o-${id}`));
}

function findReferencedAttributes(attributes: Attributes, referencedAttributesIds: string[]) {
  return attributes.filter(({ id }) => id && referencedAttributesIds.includes(id));
}

function findUnreferencedObjects(objects: Objects, referencedObjectsIds: string[]) {
  return objects.filter(({ id }) => id && !referencedObjectsIds.includes(`o-${id}`));
}

function findUnreferencedAttributes(attributes: Attributes, referencedAttributesIds: string[]) {
  return attributes.filter(({ id }) => id && !referencedAttributesIds.includes(id));
}
