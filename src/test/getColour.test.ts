import {IPlayer} from "../interface";
import {getColour} from "../utils/getColour";

describe( 'validateColours', () => {

    const players_onePlayer: IPlayer[] = [
        {id: 1, colour: "RED", position: 1, balance: 0, name: "A", coords: [0, 0], role: "A", setBalance: () => {}}];

    const players_GREEN: IPlayer[] = [
        {id: 1, colour: "YELLOW", position: 1, balance: 0, name: "A", coords: [0, 0], role: "A", setBalance: () => {}},
        {id: 2, colour: "BLUE", position: 1, balance: 0, name: "A", coords: [0, 0], role: "A", setBalance: () => {}},
        {id: 3, colour: "RED", position: 1, balance: 0, name: "A", coords: [0, 0], role: "A", setBalance: () => {}}];

    const players_full: IPlayer[] = [
        {id: 1, colour: "RED", position: 1, balance: 0, name: "A", coords: [0, 0], role: "A", setBalance: () => {}},
        {id: 2, colour: "BLUE", position: 1, balance: 0, name: "A", coords: [0, 0], role: "A", setBalance: () => {}},
        {id: 3, colour: "GREEN", position: 1, balance: 0, name: "A", coords: [0, 0], role: "A", setBalance: () => {}},
        {id: 4, colour: "YELLOW", position: 1, balance: 0, name: "A", coords: [0, 0], role: "A", setBalance: () => {}}];

    test('One RED player test', () => {
        expect(getColour(players_onePlayer)).toEqual("blue")
    })

    test('Only GREEN colour test', () => {
        expect(getColour(players_GREEN)).toBe("green")
    })

    test('FULL colour test', () => {
        expect(getColour(players_full)).toBe("red")
    })
})
