import axios from "axios";
import { IField, IInitialResponse, IInitialRequest} from "../interface";
import {DOMAIN} from '../const/url'
import fieldState from '../store/FieldState';
import sessionState from '../store/SessionState';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';

export async function setInitState(field: IField) {
    function connect() {
        var socket = new SockJS('http://localhost:8090' + '/gs-guide-websocket');
        let stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame: any) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/greetings', function (greeting) {
            });
        });
    }
    connect()
    // await axios.post('http://localhost:8090/api/v1/sessions/create', { //ERROR
    //     sessionId: sessionState.sessionId,
    //     playerName: "fff",
    //     colour: "RED"
    // });
    // const initialState = await axios.get<IInitialResponse>(DOMAIN + '/api/v1/sessions/' + sessionState.sessionId);
    // fieldState.initPerformance(field, initialState.data.cards);
} 