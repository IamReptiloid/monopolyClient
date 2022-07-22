import React, {FC, useState} from 'react';
import Button from 'react-bootstrap/Button';
import './process.scss'
import { sendStartGame } from '../../backend';
import sessionState from '../../store/SessionState';
import playerState from '../../store/PlayerState';
import { MoveStatus } from '../../enum';
import { observer } from 'mobx-react-lite';


const StartGame: FC = observer(() => {
    function start() {
        if(playerState.playerName) {
            sessionState.moveStatus = MoveStatus.Start;
            sendStartGame(sessionState.sessionId, playerState.playerName);
        }
    }

    function isAcсess() {
        return playerState.players.length <= 1
    }
    return <div className='process'>
        <div className="process__header">Начать игру</div>
        <div className="process__body">После начала никто не сможет присоедениться</div>
        <Button style={{fontSize: '10px'}} onClick={start} disabled={isAcсess()}>Начать</Button>
    </div>
})

export default StartGame