import { Stomp, CompatClient, FrameImpl, IFrame } from "@stomp/stompjs";
import { URL } from '../const/url';
import playerState from "../store/PlayerState";
import fieldState from "../store/FieldState";
import { IAddPlayerRequest, IRollDiceRequest } from "../interface";
import SockJS from "sockjs-client";
import { IRollDiceResponse, IBuyCardResponse } from "../interface";

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
            subscribeBuyCard(sessionId);
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
        stompClient.subscribe('/topic/roll-dice/' + sessionId, (response: IFrame) => {
            const data: IRollDiceResponse =  JSON.parse(response.body);
            const coords = fieldState.performance?.border[data.player.position].movementCoordinates;
            if(coords) {
                playerState.setCoords(data.player.playerName, coords, data.player.position);
            }
        })
    }
}

function subscribeBuyCard(sessionId: string) {
    if(stompClient) {
        stompClient.subscribe('/topic/buy-card/' + sessionId, (response: IFrame) => {
            const data: IBuyCardResponse = JSON.parse(response.body);
            const key = Object.keys(data.cardState)[0];
            fieldState.cardStates[key] = data.cardState[key];
            playerState.setNewBalance(data.player.playerName, data.player.balance)
        })
    }
}

export function sendBuyCard(sessionId: string,  playerName: string, cardId: number) {
    const data = {
        sessionId,
        playerName,
        cardId
    }
    if(stompClient) {
        stompClient.send('/app/sessions/buy-card', {}, JSON.stringify(data))
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