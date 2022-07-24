import React, {FC, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import playerState from '../../store/PlayerState';
import BuyingCard from './BuyingCard';
import RollDice from './RollDice';
import fieldState from '../../store/FieldState';
import sessionState from '../../store/SessionState';
import { MoveStatus, TypeCard } from '../../enum';
import { sendMoveTransition, sendChance, sendStart, sendTeleport } from '../../backend';
import { ICell } from '../../interface';
import PayForCard from './PayForCard';
import Jackpot from './Jackpot';
import TaxLuxury from './TaxLuxury';
import TaxIncome from './TaxIncome';
import Dice from './Dice';

const Event: FC = observer(() => {
    const [isRoll, setRoll] = useState(true);
    const [isBuy, setBuy] = useState(false);
    const [isPay, setPay] = useState(false);
    const [isJackpot, setJackpot] = useState(false);
    const [isTax, setTax] = useState(false);
    const [taxIncome, setTaxIncome] = useState(false);
    const [dice, setDice] = useState(false)
    let card : ICell | null = null;

    function typeEventTarget() {
    const player = playerState.players.find(el => el.name === playerState.playerName);
        if(player && fieldState.performance) {
            card = fieldState.performance.border[player.position];
            console.log(player.position, ' ', card.type)
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
                sessionState.moveStatus = MoveStatus.Start;
                sendMoveTransition(sessionState.sessionId, player.name);
            } else if (card.type === TypeCard.Jackpot) {
                setRoll(false);
                setJackpot(true);
            } else if (card.type === TypeCard.TaxLuxury) {
                setRoll(false);
                setTax(true);
            } else if (card.type === TypeCard.TaxIncome) {
                setRoll(false);
                setTaxIncome(true);
            } else if (card.type === TypeCard.Start) {
                sessionState.moveStatus = MoveStatus.Start
                setRoll(false);
                sendStart(sessionState.sessionId, player.name);
                sendMoveTransition(sessionState.sessionId, player.name);
            } else if (card.type === TypeCard.Teleport) {
                sessionState.moveStatus = MoveStatus.Start
                setRoll(false);
                sendTeleport(sessionState.sessionId, player.name);
                sendMoveTransition(sessionState.sessionId, player.name);
            } else if (card.type === TypeCard.NonType) {
                sessionState.moveStatus = MoveStatus.Start;
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
        setDice(true);
        setRoll(!isRoll);
        setTimeout(() => {
            setDice(false);
            typeEventTarget()
        }, 2600)
    }

    function setShowBuy() {
        setBuy(!isBuy);
    }

    function setShowPay() {
        setPay(!isPay)
    }

    function setShowJackpot() {
        setJackpot(!isJackpot);
    }

    function setShowTax() {
        setTax(!isTax)
    }

    function setShowTaxIncome() {
        setTaxIncome(!taxIncome)
    }
    return <>
        {dice? <Dice dice={sessionState.dice}/>: ''}
        {isRoll? <RollDice setShow={setShowRoll}/>: ''}
        {isBuy? <BuyingCard setShow={setShowBuy}/>: ''}
        {isPay? <PayForCard setShow={setShowPay}/>: ''}
        {isJackpot? <Jackpot setShow={setShowJackpot}/>: ''}
        {isTax? <TaxLuxury setShow={setShowTax}/>: ''}
        {taxIncome? <TaxIncome setShow={setShowTaxIncome}/>: ''}
    </>
})

export default Event;