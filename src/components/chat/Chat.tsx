import { observer } from 'mobx-react-lite';
import React, {FC, KeyboardEvent, useEffect, useRef} from 'react';
import './chat.scss';
import Message from './Message';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import chatState from '../../store/ChatState';
import { sendMessage } from '../../backend';
import sessionState from '../../store/SessionState';
import playerState from '../../store/PlayerState';

const Chat: FC = observer(() => {
    const ref = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        const scroll = document.querySelector('.simplebar-content-wrapper')
        if(scroll) {
            scroll.scrollTop = 9999
        }

    })
    function send(e: KeyboardEvent<HTMLInputElement>) {
        if(e.key === 'Enter' && ref.current?.value && playerState.playerName) {
            sendMessage(sessionState.sessionId, playerState.playerName, ref.current.value)
            ref.current.value = '';
        }
    }
    return <div className='chat'>
        <div className="crutch"></div>
        <SimpleBar className="chat__body">
            <div className="chat__body">
                {chatState.chatHistory.map((el, i) => <Message key={i} playerName={el.playerName} message={el.message}/>)}
            </div>
        </SimpleBar>
            {playerState.playerName?<div className="chat__input"> <input ref={ref} type="text" placeholder='Введите сообщение' onKeyDown={send}/> </div>: ''}
    </div>
})

export default Chat;