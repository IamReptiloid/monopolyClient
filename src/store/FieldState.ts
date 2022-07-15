import { makeAutoObservable } from "mobx";
import { ICard, ICardState, IField } from '../interface';

class FieldState {
    performance: null | IField = null;
    cardStates: ICardState[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    initPerformance(performance: IField, cards: ICard[]) {
        performance.init(cards);
        this.performance = performance
    }
}

export default new FieldState();