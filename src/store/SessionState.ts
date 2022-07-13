import { makeAutoObservable } from "mobx";
import { CompatClient } from '@stomp/stompjs'

class SessionState {
    sessionId: string = '';
    currentPlayer: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    setSessionId(id: string) {
        this.sessionId = id;
    }
}

export default new SessionState();