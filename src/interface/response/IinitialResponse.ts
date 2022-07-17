import {ICard, IPlayerData, ICardsStates} from '../index'
import { IMessage } from '../IChat'

export interface IInitialResponse {
    players: IPlayerData[],
    cards: ICard[],
    state: string, //todo
    cardStates: ICardsStates
    currentPlayer: string,
    chatHistory: IMessage[]
}