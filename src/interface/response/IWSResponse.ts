export interface IRollDiceResponse {
    digits: [number, number],
    message: string,
    player: {
        playerName: string,
        position: number
    }
}