export interface IAddPlayerRequest {
    sessionId: string,
    colour: string,
    playerName: string
}

export interface IRollDiceRequest {
    sessionId: string,
    playerName: string
}

export interface IBuyCardRequest {
    playerName: string,
    sessionId: string,
    cardId: number
}