import { observer } from 'mobx-react-lite';
import React, {FC, useState} from 'react';
import Button from 'react-bootstrap/Button';
import playerState from '../../store/PlayerState';
import { sendJackpot, sendMoveTransition } from '../../backend';
import sessionState from '../../store/SessionState';
import { MoveStatus } from '../../enum';

interface IProps {
    setShow: () => void
}

const Jackpot: FC<IProps> = observer(({setShow}) => {
    const [dice, setDice] = useState<number[]>([])
    function isAccess(): boolean {
        const player = playerState.players.find(el => el.name === playerState.playerName);
        if(player) {
            return (player.balance - 1000) >= 0 
        }
        return false
    } 

    function add(num: number) {
        if(dice.some(el => el === num)) {
            setDice(dice.filter((el) => el !== num))

        } else {
            if(dice.length < 3) {
                setDice([...dice, num])
            }
        }
    }

    function put() {
        if(playerState.playerName) {
            sessionState.moveStatus = MoveStatus.Start;
            sendJackpot(sessionState.sessionId, playerState.playerName, dice);
            sendMoveTransition(sessionState.sessionId, playerState.playerName);
            setShow()
        }
    }

    function skip() {
        if(playerState.playerName) {
            sessionState.moveStatus = MoveStatus.Start;
            sendMoveTransition(sessionState.sessionId, playerState.playerName);
            setShow()
        }
    }

    return (
    <div className='process'>
        <div className="process__header">JACKPOT</div>
        <div className="process__body">Сделай ставку в 1000k, и мы ее заберем, а ты сможешь получить {8000 - (dice.length? dice.length * 2000: 8000)}K</div>

        <div className="process__img">
            <img onClick={() => add(1)} className={'img ' + (dice.some(el => el === 1)? 'active': '')} src='/assets/OneDOT.png' alt="" />
            <img onClick={() => add(2)} className={'img ' + (dice.some(el => el === 2)? 'active': '')} src='/assets/TwoDOT.png' alt="" />
            <img onClick={() => add(3)} className={'img ' + (dice.some(el => el === 3)? 'active': '')} src='/assets/ThreeDOT.png' alt="" />
            <img onClick={() => add(4)} className={'img ' + (dice.some(el => el === 4)? 'active': '')} src='/assets/FourDOTS.png' alt="" />
            <img onClick={() => add(5)} className={'img ' + (dice.some(el => el === 5)? 'active': '')} src='/assets/FiveDOT.png' alt="" />
            <img onClick={() => add(6)} className={'img ' + (dice.some(el => el === 6)? 'active': '')} src='/assets/SixDOT.png' alt="" />
        </div>
        
        <div className="buttom">
            <Button onClick={put} className='buttom__left' style={{fontSize: '10px'}} disabled={!isAccess() || dice.length === 0}>Поставить</Button>
            <Button className='buttom__right' style={{fontSize: '10px'}} variant="secondary" onClick={skip}>Пропустить</Button>
        </div>
    </div>
  );
})

export default Jackpot;