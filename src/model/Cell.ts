import { ICell, ICoords, IPlayer } from "../interface";

export class Cell implements ICell {
    movementCoordinates: [number, number] = [20, 20];
    constructor(
        readonly coords: ICoords,
        readonly image: string,
        readonly id: number,
        readonly type: string,
        readonly isRotate: boolean,
        readonly isTop: boolean,
        readonly isBottom: boolean,
        readonly isRight: boolean,
        readonly isLeft: boolean
    ) {
        this.initMovementCoordinates()
    }
    
    getCoords() {
        return this.movementCoordinates;
    }

    initMovementCoordinates() {
        if(this.isTop){
            this.movementCoordinates = [this.coords.left + 8, this.coords.top + 20]
        } else if(this.isBottom){
            this.movementCoordinates = [this.coords.left + 32, this.coords.top + 20]
        } else {
            this.movementCoordinates = [this.coords.left + 20, this.coords.top + 8]
        }
        if(this.id % 10 === 1) {
            this.movementCoordinates = [this.coords.left + 20, this.coords.top + 20]
        }
    
    }
} 