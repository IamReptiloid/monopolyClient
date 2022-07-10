import axios from "axios";
import { IField, IInitialResponse} from "../interface";
import {URL} from '../const/url'
import fieldState from '../store/FieldState';
import sessionState from '../store/SessionState';
import SockJS from 'sockjs-client';
import {Stomp, CompatClient} from '@stomp/stompjs';

export async function setInitState(field: IField) {
    // await axios.post('http://localhost:8090/api/v1/sessions/create', { //ERROR
    //     sessionId: sessionState.sessionId,
    //     playerName: "fff",
    //     colour: "RED"
    // });
    // function  connect() {
    //     var socket = new SockJS('http://localhost:8090' + '/gs-guide-websocket');
    //     let stompClient = Stomp.over(socket);
    //     console.log(stompClient)
    //     stompClient.connect({}, function (frame: any) {
    //         console.log('Connected: ' + frame);
    //         stompClient.subscribe('/topic/greetings/' + sessionState.sessionId, function (greeting: any) {
    //             console.log(111)
    //             console.log(greeting)
    //         });
    //         const data = {
    //             sessionId: sessionState.sessionId
    //         }
    //         stompClient.send('/app/test', {}, JSON.stringify(data), )
    //     });
    // }
    // connect()


    const initialState = await axios.get<IInitialResponse>(URL + '/api/v1/sessions/' + sessionState.sessionId);
    fieldState.initPerformance(field, initialState.data.cards);
} 