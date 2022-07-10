import {ICard, IPlayer, ICardState} from '../index'

export interface IInitialResponse {
    players: IPlayer[],
    cards: ICard[],
    state: string, //todo
    cardsState: ICardState[]
}