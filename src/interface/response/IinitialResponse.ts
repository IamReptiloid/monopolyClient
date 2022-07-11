import {ICard, IPlayerData, ICardState} from '../index'

export interface IInitialResponse {
    players: IPlayerData[],
    cards: ICard[],
    state: string, //todo
    cardsState: ICardState[]
}