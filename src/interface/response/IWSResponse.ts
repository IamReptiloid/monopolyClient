import { ICardState } from "../ICardState"

export interface IRollDiceResponse {
    digits: [number, number],
    message: string,
    player: {
        playerName: string,
        position: number
    }
}

export interface IBuyCardResponse {
    player: {
        balance: number,
        playerName: string
    },
    cardState: {
        [key: string]: ICardState
    }
}