import { Stomp, CompatClient, FrameImpl, IFrame } from "@stomp/stompjs";
import { URL } from '../const/url';
import playerState from "../store/PlayerState";
import fieldState from "../store/FieldState";
import { IAddPlayerRequest, IPayForCardResponse, IRollDiceRequest } from "../interface";
import SockJS from "sockjs-client";
import { IRollDiceResponse, IBuyCardResponse, IStartGameResponse, IMessage } from "../interface";
import sessionState from "../store/SessionState";
import chatState from "../store/ChatState";
import { MoveStatus } from "../enum";

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
            subscribeMoveTransition(sessionId);
            subscribeStartGame(sessionId);
            subscribeChat(sessionId);
            subscribeMoveStatus(sessionId);
            subscribePayForCard(sessionId);
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

function subscribeStartGame(sessionId: string) {
    if(stompClient) {
        stompClient.subscribe('/topic/start-game/' + sessionId,  (response: IFrame) => {
            const data: IStartGameResponse = JSON.parse(response.body);
            sessionState.state = data.sessionState;
            sessionState.currentPlayer = data.currentPlayer;
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

function subscribeMoveStatus(sessionId: string) {
    if(stompClient) {
        stompClient.subscribe('/topic/move-status/' + sessionId, (response: IFrame) => {
            const data: {moveStatus: string} = JSON.parse(response.body);
            sessionState.moveStatus = data.moveStatus;
            console.log('sdfgsdfgsdfsdfgsdfgsdgf', data);
        })
    }
}

function subscribePayForCard(sessionId: string) {
    if(stompClient) {
        stompClient.subscribe('/topic/pay-for-card/' + sessionId, (response: IFrame) => {
            const data: IPayForCardResponse = JSON.parse(response.body);
            playerState.setNewBalance(data.buyer.playerName, data.buyer.balance);
            playerState.setNewBalance(data.owner.playerName, data.owner.balance);
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

function subscribeMoveTransition(sessionId: string) {
    if(stompClient) {
        stompClient.subscribe('/topic/move-transition/' + sessionId, (response: IFrame) => {
            const data: {currentPlayer: string} = JSON.parse(response.body);
            sessionState.currentPlayer = data.currentPlayer
        })
    }
}

function subscribeChat(sessionId: string) {
    if(stompClient) {
        stompClient.subscribe('/topic/chat/' + sessionId, (response: IFrame) => {
            const data: IMessage = JSON.parse(response.body)
            chatState.chatHistory.push(data)
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

export function sendStartGame (sessionId: string, playerName: string) {
    if(stompClient) {
        stompClient.send('/app/sessions/start-game', {}, JSON.stringify({sessionId, playerName}))
    }
}

export function sendNewMoveStatus(sessionId: string) {
    if(stompClient) {
        stompClient.send('/app/sessions/move-status', {}, JSON.stringify({sessionId}))
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

export function sendMoveTransition(sessionId: string, playerName: string) {
    if(stompClient) {
        stompClient.send('/app/sessions/move-transition', {}, JSON.stringify({sessionId, playerName}))
    }
}

export function sendMessage(sessionId: string, playerName: string, message: string) {
    if(stompClient) {
        stompClient.send('/app/chat/common', {}, JSON.stringify({
            sessionId, 
            sender: playerName, 
            message
        }))
    }
}

export function sendPayForCard(sessionId: string, playerName: string, cardId: number) {
    if(stompClient) {
        stompClient.send('/app/sessions/pay-for-card', {}, JSON.stringify({sessionId, playerName, cardId}))
    }
}