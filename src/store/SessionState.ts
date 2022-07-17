import { makeAutoObservable } from "mobx";
import { StatusGame } from '../enum'

class SessionState {
    sessionId = '';
    currentPlayer = '';
    state = ''

    constructor() {
        makeAutoObservable(this);
    }

    setSessionId(id: string) {
        this.sessionId = id;
    }

    get isStart(): boolean {
        return this.state === StatusGame.InProgress;
    }
}

export default new SessionState();