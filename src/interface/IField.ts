import { IPlayer } from "./IPlayer"

export interface ICard {
    id: number,
    image: string,
    type: string // TODO enum
}

export interface ICoords {
    top: number,
    left: number
}

export interface ICell extends ICard {
    coords: ICoords
    movementCoordinates: [number, number]
    isRotate: boolean,
    isTop: boolean,
    isBottom: boolean
    isRight: boolean,
    isLeft: boolean,
    initMovementCoordinates: () => void
}

export interface IField {
    border: ICell[],
    init(cards: ICard[]): void
}

