import { makeAutoObservable } from "mobx";
import { ICard, ICardsStates, IField } from '../interface';

class FieldState {
    performance: null | IField = null;
    cardStates: ICardsStates = {};

    constructor() {
        makeAutoObservable(this);
    }

    initPerformance(performance: IField, cards: ICard[]) {
        performance.init(cards);
        this.performance = performance
    }

    setNewCardState(data: ICardsStates) {
        const keys = Object.keys(data);
        keys.forEach(id => {
            this.cardStates[id] = data[id]
        })
    }
}

export default new FieldState();