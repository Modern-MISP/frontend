export function getReferencedItems(objects: any[], attributes: any[], references: any[]) {
  let referencedObjects = [];
  let referencedAttributes = [];

  const referencedItemsIds: string[] = Array.from(
    new Set(references.flatMap((reference) => [reference.from, reference.to]))
  );

  const referencedObjectsIds: string[] = referencedItemsIds.filter((id) => id.startsWith('o-'));
  const referencedAttributesIds: string[] = referencedItemsIds.filter((id) => !id.startsWith('o-'));

  for (const referencedObjectId of referencedObjectsIds) {
    let referencedObject = objects.find((item) => `o-${item.id}` === referencedObjectId);
    if (referencedObject) {
      referencedObjects.push(referencedObject);
    }
  }

  for (const referencedAttributeId of referencedAttributesIds) {
    let referencedAttribute = attributes.find((item) => item.id === referencedAttributeId);
    if (referencedAttribute) {
      referencedAttributes.push(referencedAttribute);
    }
  }

  let unreferencedObjects = objects.filter(
    (object) =>
      !referencedObjectsIds.some((referencedObjectId) => `o-${object.id}` === referencedObjectId)
  );

  let unreferencedAttributes = attributes.filter(
    (attribute) =>
      !referencedAttributesIds.some(
        (referencedAttributesId) => `${attribute.id}` === referencedAttributesId
      )
  );

  return { referencedObjects, referencedAttributes, unreferencedObjects, unreferencedAttributes };
}