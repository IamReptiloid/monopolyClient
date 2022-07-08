import { IField, ICell, ICard, ICoords } from "../interface";

export class Field implements IField {
    public border: ICell[] = [];

    public async init() {
        const cards: ICard[] = await [ // TODO request
            {id: 0, type: 'asdf', img: 'sdfg'},
            {id: 1, type: 'asdf', img: 'sdfg'},
            {id: 2, type: 'asdf', img: 'sdfg'},
            {id: 3, type: 'asdf', img: 'sdfg'},
            {id: 4, type: 'asdf', img: 'sdfg'},
            {id: 5, type: 'asdf', img: 'sdfg'},
            {id: 6, type: 'asdf', img: 'sdfg'},
            {id: 7, type: 'asdf', img: 'sdfg'},
            {id: 8, type: 'asdf', img: 'sdfg'},
            {id: 9, type: 'asdf', img: 'sdfg'},
            {id: 10, type: 'asdf', img: 'sdfg'},
            {id: 11, type: 'asdf', img: 'sdfg'},
            {id: 12, type: 'asdf', img: 'sdfg'},
            {id: 13, type: 'asdf', img: 'sdfg'},
            {id: 14, type: 'asdf', img: 'sdfg'},
            {id: 15, type: 'asdf', img: 'sdfg'},
            {id: 16, type: 'asdf', img: 'sdfg'},
            {id: 17, type: 'asdf', img: 'sdfg'},
            {id: 18, type: 'asdf', img: 'sdfg'},
            {id: 19, type: 'asdf', img: 'sdfg'},
            {id: 20, type: 'asdf', img: 'sdfg'},
            {id: 21, type: 'asdf', img: 'sdfg'},
            {id: 22, type: 'asdf', img: 'sdfg'},
            {id: 23, type: 'asdf', img: 'sdfg'},
            {id: 24, type: 'asdf', img: 'sdfg'},
            {id: 25, type: 'asdf', img: 'sdfg'},
            {id: 26, type: 'asdf', img: 'sdfg'},
            {id: 27, type: 'asdf', img: 'sdfg'},
            {id: 28, type: 'asdf', img: 'sdfg'},
            {id: 29, type: 'asdf', img: 'sdfg'},
            {id: 30, type: 'asdf', img: 'sdfg'},
            {id: 31, type: 'asdf', img: 'sdfg'},
            {id: 32, type: 'asdf', img: 'sdfg'},
            {id: 33, type: 'asdf', img: 'sdfg'},
            {id: 34, type: 'asdf', img: 'sdfg'},
            {id: 35, type: 'asdf', img: 'sdfg'},
            {id: 36, type: 'asdf', img: 'sdfg'},
            {id: 37, type: 'asdf', img: 'sdfg'},
            {id: 38, type: 'asdf', img: 'sdfg'},
            {id: 39, type: 'asdf', img: 'sdfg'},
        ]

        this.initCell(cards);
    }

    private initCell(cards: ICard[]) { // TODO refactoring
        let top = 0;
        let left = 0;
        cards.forEach((card: ICard, i) => {
            const isLateral = Math.floor(i / 10) === 0 && i % 10 !== 0 || Math.floor(i / 10) === 2 && i % 10 !== 0;
            const coords: ICoords = {
                top: isLateral? top + 29: top, 
                left: isLateral? i < 10? left - 29: left + 29: left
            }
            this.border.push({
                coords,
                img: card.img,
                id: card.id,
                type: card.type,
                transform: isLateral? 'rotate(90deg)' : ''
            })

            if (10 === i) {
                top += 124;
            }
            if(20 === i) {
                left -= 124;
            }
            if(i === 0) { 
                left += 124;
            }

            if(!isLateral) {
                if(10 < i && i < 20) {
                    top += 67;
                }

                if(30 <= i && i < 40) {
                    top -= 67;
                }
            } else {
                if(i !== 0 && i < 10) {
                    left += 66;
                }

                if(20 < i && i < 30) {
                    left -= 66;
                }
            }

            
        })
    }
}