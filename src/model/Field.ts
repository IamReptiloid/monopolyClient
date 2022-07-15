import { IField, ICell, ICard, ICoords } from "../interface";
import { Cell } from './Cell'

type typeGetCoords = (numberCell: number) => ICoords;

export class Field implements IField {
    border: ICell[] = [];

    public init(cards: ICard[]) {
        const getCoords: typeGetCoords = this.initCoords();

        cards.forEach((card: ICard, numberCell) => {
            const isTopOrBottomSide = this.isTopOrBottomSide(numberCell);
            const coords: ICoords = getCoords(numberCell);
            this.border.push(new Cell(
                coords,
                card.image,
                card.id,
                card.type,
                isTopOrBottomSide,
                this.isTop(numberCell),
                this.isBottom(numberCell)
            ))
        })
    }

    private getNumberSide(numberCell: number): number {
        return Math.floor(numberCell / 10);
    }

    private isTop(numberCell: number): boolean {
        const numberSide = this.getNumberSide(numberCell);
        const isTop = numberSide === 0 && numberCell % 10 !== 0;
        return isTop;
    }

    private isBottom(numberCell: number): boolean {
        const numberSide = this.getNumberSide(numberCell);
        const isBottom = numberSide === 2 && numberCell % 10 !== 0;
        return isBottom;
    }

    private isTopOrBottomSide(numberCell: number): boolean {
        return this.isTop(numberCell) || this.isBottom(numberCell);
    }

    private changeСoordinates(numberCell: number, top: number, left: number): number[] {
        if(numberCell === 0) { 
            left += 62;
        }
        if (10 === numberCell) {
            top += 62;
        }
        if(20 === numberCell) {
            left -= 62;
        }
        
        if(numberCell !== 0 && numberCell < 10) {
            left += 40;
        }
        if(20 < numberCell && numberCell < 30) {
            left -= 40;
        }
        if(10 < numberCell && numberCell < 20) {
            top += 40;
        }

        if(30 <= numberCell && numberCell < 40) {
            top -= 40;
        }

        return [top, left];
    }

    private initCoords(): typeGetCoords {
        let top = 0;
        let left = 0;

        return (numberCell: number): ICoords => {
            let result = {
                top: top,
                left: left
            };
            [top, left] = this.changeСoordinates(numberCell, top, left);
            return result;
        }
    }


}