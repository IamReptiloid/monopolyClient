import { ICardsStates, ICardState } from "../ICardState"

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

export interface IStartGameResponse {
    sessionState: string,
    currentPlayer: string
}

export interface IPayForCardResponse {
    buyer: {
        balance: number,
        playerName: string
    }
    owner: {
        balance: number,
        playerName: string
    }
}

export interface ISurrenderResponse {
    player: {
        playerName: string,
        status: string
    },
    cardStates: ICardsStates
}