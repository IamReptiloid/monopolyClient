import React, {FC, useState} from 'react';
import Button from 'react-bootstrap/Button';
import './process.scss'
import { sendStartGame } from '../../backend';
import sessionState from '../../store/SessionState';
import playerState from '../../store/PlayerState';


const StartGame: FC = () => {
    function start() {
        if(playerState.playerName) {
            sendStartGame(sessionState.sessionId, playerState.playerName);
        }
    }
    return <div className='process'>
        <div className="process__header">Начать игру</div>
        <div className="process__body">После начала никто не сможет присоедениться</div>
        <Button style={{fontSize: '10px'}} onClick={start}>Начать</Button>
    </div>
}

export default StartGame