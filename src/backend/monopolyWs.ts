import { Stomp, CompatClient, FrameImpl, IFrame } from "@stomp/stompjs";
import { URL } from '../const/url';
import playerState from "../store/PlayerState";
import { IAddPlayerRequest } from "../interface/request";
import SockJS from "sockjs-client";

let stompClient: CompatClient | null = null;

export  function setConnect(sessionId: string) {
    const socket = SockJS(URL + '/monopoly-ws');
    stompClient = Stomp.over(socket);
    subscribes(sessionId);
}

function subscribes(sessionId: string) {
    if(stompClient) {
        stompClient.connect({}, function (frame: FrameImpl) {
            console.log('connect: ',frame);
            subscribeAddPlayer(sessionId)
        });
    }
}

function subscribeAddPlayer(sessionId: string) {
    if(stompClient) {
        stompClient.subscribe('/topic/add-player/' + sessionId, (data: IFrame) => {
            playerState.addPlayer(JSON.parse(data.body)); 
        })
    }
}

export function sendAddPlayer(data: IAddPlayerRequest) {
    if(stompClient) {
        stompClient.send('/app/sessions/add-player', {}, JSON.stringify(data))
    }
}