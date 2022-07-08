export interface ICard {
    id: number,
    img: string,
    type: string // TODO enum
}

export interface ICoords {
    top: number,
    left: number
}

export interface ICell extends ICard {
    coords: ICoords
    transform: string //todo?
}

export interface IField {
    border: ICell[],
    init(): void
}

