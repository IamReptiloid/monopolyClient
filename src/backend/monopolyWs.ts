import { Stomp, CompatClient, FrameImpl, IFrame } from "@stomp/stompjs";
import { URL } from '../const/url';
import playerState from "../store/PlayerState";
import fieldState from "../store/FieldState";
import { IAddPlayerRequest, IRollDiceRequest } from "../interface/request";
import SockJS from "sockjs-client";
import { IRollDiceResponse } from "../interface";

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
            const response: IRollDiceResponse =  JSON.parse(data.body)
            const coords = fieldState.performance?.border[response.player.position].movementCoordinates;
            if(coords) {
                playerState.setCoords(response.player.playerName, coords, response.player.position)
            }
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