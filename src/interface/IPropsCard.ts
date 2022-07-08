export interface IPosition {
    top: number,
    left: number
}

export interface IPropsCard {
    img: string,
    position: IPosition,
}

export interface IPropsCardRectangular extends IPropsCard {
    transform: string
}