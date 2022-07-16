import { observer } from 'mobx-react-lite';
import React, {FC, useState} from 'react';
import Button from 'react-bootstrap/Button';
import fieldState from '../../store/FieldState';
import playerState from '../../store/PlayerState';
import { sendBuyCard } from '../../backend';
import './rollDice.scss'
import sessionState from '../../store/SessionState';

interface IProps {
    setShow: () => void
}

const BuyingCard: FC<IProps> = observer(({setShow}) => {
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

    function buy() {
        const player = playerState.players.find(el => el.name === playerState.playerName);
        console.log(playerState.playerName)
        if(player && playerState.playerName) {
            sendBuyCard(sessionState.sessionId, playerState.playerName , player.position + 1)
            setShow()
        }
    }

    function notBuy() {
        setShow()
    }
    return (
    <div className='rollDice'>
        <div className="rollDice__header">Покупаем?</div>
        <div className="rollDice__body">Если не купите, то ее сможет забрать другой игрок</div>
        <div className="buttom">
            <Button className='buttom__left' style={{fontSize: '10px'}} onClick={buy} disabled={!isAccess()}>Купить</Button>
            <Button className='buttom__right' style={{fontSize: '10px'}} variant="secondary" onClick={notBuy}>Не купить</Button>
        </div>
    </div>
  );
})

export default BuyingCard;