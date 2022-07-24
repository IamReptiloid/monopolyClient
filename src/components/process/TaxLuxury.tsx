import { observer } from 'mobx-react-lite';
import React, {FC} from 'react';
import Button from 'react-bootstrap/Button';
import playerState from '../../store/PlayerState';
import {sendMoveTransition, sendPayForCard, sendSurrender, sendTaxLuxury } from '../../backend';
import sessionState from '../../store/SessionState';
import { MoveStatus } from '../../enum';

interface IProps {
    setShow: () => void,
}

const TaxLuxury: FC<IProps> = observer(({setShow}) => {
    function isAccess(): boolean {
        const player = playerState.players.find(el => el.name === playerState.playerName);
        if(player) {
            return (player.balance - 1000) >= 0 
        }
        return false
    } 

    function pay() {
        const player = playerState.players.find(el => el.name === playerState.playerName);
        if(player && playerState.playerName) {
            sendTaxLuxury(sessionState.sessionId, player.name);
            sendMoveTransition(sessionState.sessionId, player.name);
            sessionState.moveStatus = MoveStatus.Start
            setShow();
        }
    }

    function dontPay() {
        if(playerState.playerName) {
            sendSurrender(sessionState.sessionId, playerState.playerName);
            sendMoveTransition(sessionState.sessionId, playerState.playerName);
            sessionState.moveStatus = MoveStatus.Start
        }
        setShow();
    }
    return (
    <div className='process'>
        <div className="process__header">Необходимо банку 1000k</div>
        <div className="process__body">Подсказка: если у вас не хватает средств то нужно...</div>
        <div className="buttom">
            <Button className='buttom__left' style={{fontSize: '10px'}} onClick={pay} disabled={!isAccess()}>Заплатить</Button>
            <Button className='buttom__right' style={{fontSize: '10px'}} variant="secondary" onClick={dontPay}>Сдаться</Button>
        </div>
    </div>
  );
})

export default TaxLuxury;