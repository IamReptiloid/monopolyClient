import React, {FC, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import Button from 'react-bootstrap/Button';
import sessionState from '../../store/SessionState';
import playerState from "../../store/PlayerState"; //todo
import { sendRollDice } from '../../backend';
import Head from 'next/head';

interface IProps {
    setShow: () => void
}

const RollDice: FC<IProps> = observer((props) => {
    const audio = new Audio('/assets/audio/Sound_11086.mp3');
    
    useEffect(() => {
        audio.play()
    },[])

    const roll = () => {
        sendRollDice({
            sessionId: sessionState.sessionId, 
            playerName: playerState.playerName || ''
        });
        props.setShow();
    }

    return <div className='process'>
        <Head><title>Ваш ход</title></Head>
        <div className="process__header">Ваш ход!</div>
        <div className="process__body">Вперед к новым победам</div>
        <Button style={{fontSize: '10px'}} onClick={roll}>Бросить кубик</Button>
    </div>
})

export default RollDice