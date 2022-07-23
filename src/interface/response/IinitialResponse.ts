import {ICard, IPlayerData, ICardsStates} from '../index'
import { IMessage } from '../IChat'

export interface IInitialResponse {
    players: IPlayerData[],
    state: string, //todo
    cardStates: ICardsStates
    currentPlayer: string | null,
    chatHistory: IMessage[]
    moveStatus: string | null
}

export interface ICardData {
    cards: ICard[],
}