import { makeAutoObservable } from "mobx";
import { IMessage } from "../interface/IChat";


class ChatState {
    chatHistory: IMessage[] = []
    constructor() {
        makeAutoObservable(this)
    }
}

export default new ChatState();
