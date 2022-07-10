import { makeAutoObservable } from "mobx";
import { ICard, IField } from '../interface';

class FieldState {
    performance: null | IField = null;

    constructor() {
        makeAutoObservable(this);
    }

    initPerformance(performance: IField, cards: ICard[]) {
        performance.init(cards);
        this.performance = performance
    }
}

export default new FieldState();