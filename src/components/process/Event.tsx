import React, {FC, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import playerState from '../../store/PlayerState';
import BuyingCard from './BuyingCard';
import RollDice from './RollDice';
import fieldState from '../../store/FieldState';
import sessionState from '../../store/SessionState';
import { MoveStatus } from '../../enum';
import { sendPayForCard, sendMoveTransition } from '../../backend';

const Event: FC = observer(() => {
    const [isRoll, setRoll] = useState(true);
    const [isBuy, setBuy] = useState(false)

    function typeEventTrget() {
    const player = playerState.players.find(el => el.name === playerState.playerName);
        if(player && fieldState.performance) {
            const card = fieldState.performance.border[player.position];
            if (card.type === 'COMPANY' && !fieldState.cardStates[card.id].ownerName) {
                setRoll(false);
                setBuy(true)
            } else if (card.type === 'COMPANY' && fieldState.cardStates[card.id].ownerName !== player.name) {
                sendPayForCard(sessionState.sessionId, player.name, card.id);
            } 
        }
    }

    useEffect(() => {
        if(sessionState.moveStatus === MoveStatus.Start) {
            setRoll(true);
        } else if(sessionState.moveStatus === MoveStatus.Middle) {
            typeEventTrget()
        }
    }, [])

    function setShowRoll() {
        setRoll(!isRoll);
        setTimeout(() => {
            typeEventTrget()
        }, 600)
    }

    function setShowBuy() {
        setBuy(!isBuy);
    }
    return <>
        {isRoll? <RollDice setShow={setShowRoll}/>: ''}
        {isBuy? <BuyingCard setShow={setShowBuy}/>: ''}
    </>
})

export default Event;