import {Field} from "../model/Field";
import {ICard} from "../interface";

describe('', () => {

    const cards: ICard[] = [{
        id: 1,
        image: '1',
        type: '1'
    },{
        id: 11,
        image: '11',
        type: '11'
    },{
        id: 21,
        image: '21',
        type: '21'
    },{
        id: 31,
        image: '31',
        type: '31'
    }]

    const trueCards = [
        {
            coords: { top: 0, left: 0 },
            image: '1',
            id: 1,
            type: '1',
            isRotate: false,
            isTop: false,
            isBottom: false,
            isRight: false,
            isLeft: false,
            movementCoordinates: [ 20, 20 ]
        },
        {
            coords: { top: 0, left: 62 },
            image: '11',
            id: 11,
            type: '11',
            isRotate: true,
            isTop: true,
            isBottom: false,
            isRight: false,
            isLeft: false,
            movementCoordinates: [ 82, 20 ]
        },
        {
            coords: { top: 0, left: 102 },
            image: '21',
            id: 21,
            type: '21',
            isRotate: true,
            isTop: true,
            isBottom: false,
            isRight: false,
            isLeft: false,
            movementCoordinates: [ 122, 20 ]
        },
        {
            coords: { top: 0, left: 142 },
            image: '31',
            id: 31,
            type: '31',
            isRotate: true,
            isTop: true,
            isBottom: false,
            isRight: false,
            isLeft: false,
            movementCoordinates: [ 162, 20 ]
        }
    ]

    const field = new Field()

    test('', () => {
        field.init(cards)
        expect(field.border).toEqual(trueCards)
    })

})

