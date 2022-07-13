export interface IPosition {
    top: number,
    left: number
}

export interface IPropsCard {
    image: string,
    position: IPosition,
}

export interface IPropsCardRectangular extends IPropsCard {
    isRotate: boolean,
    isTop: boolean
}