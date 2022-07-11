import { makeAutoObservable } from "mobx";
import { CompatClient } from '@stomp/stompjs'

class SessionState {
    sessionId: null | string = null;
    wsConnection: null | CompatClient = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSessionId(id: string) {
        this.sessionId = id;
    }
}

export default new SessionState();