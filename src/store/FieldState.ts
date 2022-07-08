import { makeAutoObservable } from "mobx";
import { IField } from '../interface';

class FieldState {
    performance: null | IField = null;

    constructor() {
        makeAutoObservable(this);
    }

    async initPerformance(performance: IField) {
        await performance.init();
        this.performance = performance
    }
}

export default new FieldState();