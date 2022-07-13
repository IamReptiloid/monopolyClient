import { Stomp, CompatClient, FrameImpl, IFrame } from "@stomp/stompjs";
import { URL } from '../const/url';
import playerState from "../store/PlayerState";
import { IAddPlayerRequest, IRollDiceRequest } from "../interface/request";
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
            subscribeAddPlayer(sessionId);
            subscribeRollDice(sessionId);
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

function subscribeRollDice(sessionId: string) {
    if(stompClient) {
        stompClient.subscribe('/topic/roll-dice/' + sessionId, (data: IFrame) => {
            console.log(JSON.parse(data.body)); 
        })
    }
}

export function sendRollDice(data: IRollDiceRequest) {
    if(stompClient) {
        stompClient.send('/app/sessions/roll-dice', {}, JSON.stringify(data))
    }
}

export function sendAddPlayer(data: IAddPlayerRequest) {
    if(stompClient) {
        stompClient.send('/app/sessions/add-player', {}, JSON.stringify(data))
    }
}