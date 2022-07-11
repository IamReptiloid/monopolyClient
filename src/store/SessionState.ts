import { makeAutoObservable } from "mobx";
import { CompatClient } from '@stomp/stompjs'

class SessionState {
    sessionId: string = '';
    wsConnection: null | CompatClient = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSessionId(id: string) {
        this.sessionId = id;
    }
}

export default new SessionState();