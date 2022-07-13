import React, {FC, useState} from 'react';
import { observer } from 'mobx-react-lite';
import Button from 'react-bootstrap/Button';
import sessionState from '../../store/SessionState';
import playerState from "../../store/PlayerState"; //todo
import { sendRollDice } from '../../backend';
import './rollDice.scss'

const RollDice: FC = observer(() => {
    const [show, setShow] = useState(true);

    const roll = () => {
        sendRollDice({
            sessionId: sessionState.sessionId, 
            playerName: playerState.playerName || ''});
        setShow(false)
    }

    return <div className='rollDice' style={{display: show? '': 'none'}}>
        <div className="rollDice__header">Ваш ход!</div>
        <div className="rollDice__body">Вперед к новым победам</div>
        <Button style={{fontSize: '10px'}} onClick={roll}>Бросить кубик</Button>
    </div>
})

export default RollDice