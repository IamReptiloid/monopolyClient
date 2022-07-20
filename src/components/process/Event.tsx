import React, {FC, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import playerState from '../../store/PlayerState';
import BuyingCard from './BuyingCard';
import RollDice from './RollDice';
import fieldState from '../../store/FieldState';
import sessionState from '../../store/SessionState';
import { MoveStatus, TypeCard } from '../../enum';
import { sendMoveTransition, sendChance } from '../../backend';
import { ICell } from '../../interface';
import PayForCard from './PayForCard';

const Event: FC = observer(() => {
    const [isRoll, setRoll] = useState(true);
    const [isBuy, setBuy] = useState(false);
    const [isPay, setPay] = useState(false);
    let card : ICell | null = null;

    function typeEventTarget() {
    const player = playerState.players.find(el => el.name === playerState.playerName);
        if(player && fieldState.performance) {
            card = fieldState.performance.border[player.position];
            if (card.type === TypeCard.Company && !fieldState.cardStates[card.id].ownerName) {
                setRoll(false);
                setBuy(true)
            } else if (card.type === TypeCard.Company && fieldState.cardStates[card.id].ownerName !== player.name) {
                setRoll(false);
                setPay(true);
            } else if (card.type === TypeCard.Chance) {
                sessionState.moveStatus = MoveStatus.Start
                sendChance(sessionState.sessionId, player.name);
                sendMoveTransition(sessionState.sessionId, player.name);
            } else if (card.type === TypeCard.Company && fieldState.cardStates[card.id].ownerName === player.name) {
                sendMoveTransition(sessionState.sessionId, player.name);
            }
        }
    }

    useEffect(() => {
        if(sessionState.moveStatus === MoveStatus.Start) {
            setRoll(true);
        } else if(sessionState.moveStatus === MoveStatus.Middle) {
            typeEventTarget()
        }
    }, [])

    function setShowRoll() {
        setRoll(!isRoll);
        setTimeout(() => {
            typeEventTarget()
        }, 600)
    }

    function setShowBuy() {
        setBuy(!isBuy);
    }

    function setShowPay() {
        setPay(!isPay)
    }
    return <>
        {isRoll? <RollDice setShow={setShowRoll}/>: ''}
        {isBuy? <BuyingCard setShow={setShowBuy}/>: ''}
        {isPay? <PayForCard setShow={setShowPay}/>: ''}
    </>
})

export default Event;