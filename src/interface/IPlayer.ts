export interface IPlayerData {
    id: number,
    position: number,
    name: string,
    balance: number,
    colour: string,
    role: string
}

export interface IPlayer extends IPlayerData {
    coords: [number, number],
    setPosition: (position: number) => void
}