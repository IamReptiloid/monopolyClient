import fieldState from "../store/FieldState";

export function getCollection(collectionId: number): string[] {
    const keys = Object.keys(fieldState.cardStates)
    const collection = keys.filter(id => {
        return fieldState.cardStates[id].collectionNumber === collectionId
    })
    return collection;
}