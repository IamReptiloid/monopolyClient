import { Colour } from "../enum/index";

export interface IPlayerData {
    id: number,
    position: number,
    name: string,
    balance: number,
    colour: Colour
}

export interface IPlayer extends IPlayerData {
    setPosition: (position: number) => void
}