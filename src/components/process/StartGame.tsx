import React, {FC, useState} from 'react';
import Button from 'react-bootstrap/Button';
import './process.scss'
import { sendNewMoveStatus, sendStartGame } from '../../backend';
import sessionState from '../../store/SessionState';
import playerState from '../../store/PlayerState';
import { MoveStatus } from '../../enum';


const StartGame: FC = () => {
    function start() {
        if(playerState.playerName) {
            // sendNewMoveStatus(sessionState.sessionId);
            sessionState.moveStatus = MoveStatus.Start;
            console.log(sessionState.moveStatus)
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