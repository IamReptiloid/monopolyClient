import {ICard, IPlayerData, ICardsStates} from '../index'

export interface IInitialResponse {
    players: IPlayerData[],
    cards: ICard[],
    state: string, //todo
    cardStates: ICardsStates
    currentPlayer: string
}