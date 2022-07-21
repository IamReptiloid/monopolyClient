import {Cell} from "../model/Cell";

describe('Test Cell', () => {

    const CellTop = new Cell(
        {top: 10, left: 10},
        "",
        5,
        "",
        false,
        true,
        false,
        false,
        false
    )

    const CellBottom = new Cell(
        {top: 10, left: 10},
        "",
        5,
        "",
        false,
        false,
        true,
        false,
        false
    )

    const CellNot = new Cell(
        {top: 10, left: 10},
        "",
        5,
        "",
        false,
        false,
        false,
        false,
        false
    )

    const CellIdOne = new Cell(
        {top: 10, left: 10},
        "",
        1,
        "",
        false,
        false,
        false,
        false,
        false
    )

    test('Cell Top test', () => {
        expect(CellTop.movementCoordinates).toEqual([18, 30])
    })

    test('Cell Bottom test', () => {
        expect(CellBottom.movementCoordinates).toEqual([42, 30])
    })

    test('Cell not Top & Bottom & FirstID test', () => {
        expect(CellNot.movementCoordinates).toEqual([30, 18])
    })

    test('Cell FirstID', () => {
        expect(CellIdOne.movementCoordinates).toEqual([30, 30])
    })
})