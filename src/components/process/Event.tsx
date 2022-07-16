import React, {FC, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import playerState from '../../store/PlayerState';
import BuyingCard from './BuyingCard';
import RollDice from './RollDice';
import fieldState from '../../store/FieldState';

const Event: FC = observer(() => {
    const [isRoll, setRoll] = useState(false);
    const [isBuy, setBuy] = useState(false)

    function setShowRoll() {
        setRoll(!isRoll);
        setTimeout(() => {
            const player = playerState.players.find(el => el.name === playerState.playerName);
            if(player && fieldState.performance) {
                const card = fieldState.performance.border[player.position];
                if(card.type === 'COMPANY' && !fieldState.cardStates[card.id].ownerName) {
                    setShowBuy()
                }
            }
        }, 600)
    }

    function setShowBuy() {
        setBuy(!isBuy);
    }
    return <>
        {isRoll? '': <RollDice setShow={setShowRoll}/>}
        {isBuy? <BuyingCard setShow={setShowBuy}/>: ''}
    </>
})

export default Event;