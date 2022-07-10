import { makeAutoObservable } from "mobx";

class SessionState {
    sessionId: null | string = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSessionId(id: string) {
        this.sessionId = id;
    }
}

export default new SessionState();