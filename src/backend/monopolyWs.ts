import { Stomp, CompatClient, FrameImpl } from "@stomp/stompjs";
import { URL } from '../const/url';
import SockJS from "sockjs-client";

let stompClient: CompatClient | null = null;

export function setConnect(): CompatClient {
    const socket = SockJS(URL + '/monopoly-ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame: FrameImpl) {
        console.log(frame);
    });
    return stompClient;
}

export function subscribeAddPlayer() {
    // stompClient.subscribe('', )
}