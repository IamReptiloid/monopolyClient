export interface ICardState {
    price: number,
    fine: null | number,
    ownerName: null | string,
    level: number,
    collectionNumber: number
}

export interface ICardsStates {
    [key: string]: ICardState
}