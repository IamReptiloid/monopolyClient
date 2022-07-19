import { observer } from 'mobx-react-lite';
import React, {FC, useState} from 'react';
import Button from 'react-bootstrap/Button';
import fieldState from '../../store/FieldState';
import playerState from '../../store/PlayerState';
import {sendMoveTransition, sendPayForCard } from '../../backend';
import './process.scss'
import sessionState from '../../store/SessionState';
import { MoveStatus } from '../../enum';
import { ICell } from '../../interface';

interface IProps {
    setShow: () => void,
}

const PayForCard: FC<IProps> = observer(({setShow}) => {
    function isAccess(): boolean {
        const player = playerState.players.find(el => el.name === playerState.playerName);
        if(player) {
            const card = fieldState.cardStates[player.position + 1];
            if (card) {
                return (player.balance - card.price) >= 0 
            }
            return false
        }
        return false
    } 

    function pay() {
        const player = playerState.players.find(el => el.name === playerState.playerName);
        if(player && playerState.playerName) {
            sendPayForCard(sessionState.sessionId, player.name, player.position + 1);
            sendMoveTransition(sessionState.sessionId, player.name);
            sessionState.moveStatus = MoveStatus.Start
            setShow();
        }
    }

    function dontPay() {
        if(playerState.playerName) {
            sendMoveTransition(sessionState.sessionId, playerState.playerName);
            sessionState.moveStatus = MoveStatus.Start
        }
        setShow();
    }
    return (
    <div className='process'>
        <div className="process__header">Необходимо заплатить аренду</div>
        <div className="process__body">Подсказка: если у вас не хватает средств то нужно...</div>
        <div className="buttom">
            <Button className='buttom__left' style={{fontSize: '10px'}} onClick={pay} disabled={!isAccess()}>Заплатить</Button>
            <Button className='buttom__right' style={{fontSize: '10px'}} variant="secondary" onClick={dontPay}>Сдаться</Button>
        </div>
    </div>
  );
})

export default PayForCard;