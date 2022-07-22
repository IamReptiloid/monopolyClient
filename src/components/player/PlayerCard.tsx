import React, {FC, useState, useEffect, useRef} from 'react';
import { sendMoveTransition, sendSurrender } from '../../backend';
import { colorActivePlayer } from '../../const/clour';
import { StatusPlayer } from '../../enum';
import { IPlayer } from '../../interface';
import playerState from '../../store/PlayerState';
import sessionState from '../../store/SessionState';
import './playerCard.scss';
const logo =  require("../../assets/pl.jpg")

interface IProps {
    player: IPlayer
    currentPlayer: string | null
}

const PlayerCard: FC<IProps> = (props: IProps) => {
    const isActive = props.currentPlayer === props.player.name;
    const colour = colorActivePlayer[props.player.colour];
    const [show, setShow] = useState(false)
    const ref = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const handle = (e: any) => {
            if(!ref.current) return;
            if(!ref.current.contains(e.target)) {
                setShow(false);
            }
        };

        document.addEventListener('click', handle);

        return () => {
            document.removeEventListener('click', handle)
        }
    }, [])

    function myFunction() {
        setShow(!show)
    }

    function surrender() {
        if(playerState.playerName) {
            sendMoveTransition(sessionState.sessionId, playerState.playerName);
            sendSurrender(sessionState.sessionId, playerState.playerName);
            setShow(!show);
        }
    }
    console.log(props.player.status)
    if(props.player.status === StatusPlayer.Won) {
        return <div className="won">
            <div className="won__text">
                Победитель этой игры
            </div>
            <div>
                <img src={require('../../assets/biba.jpg')} alt="" className="playerCard__img" style={{borderColor: colour[1]}}/>
            </div>
            <div>
                {props.player.name}
            </div>
            
        </div>
    }

    return <div className={'playerCard ' + (props.player.status === StatusPlayer.Lost? 'playerCard__lost': '')} style={{background: isActive?`linear-gradient(70deg, ${colour[0]}, ${colour[1]})`: '#14181b', transform: isActive? 'scale(1.06)': ''}}>
        <div>
            <img src={logo} alt="" className="playerCard__img" style={{borderColor: colour[1]}}/>
        </div>

        <div className='playerCard__name'>
            {sessionState.isStart
                ?   <div className="dropdown" ref={ref}>
                        <button onClick={myFunction} className="dropbtn">{props.player.name}</button>
                        <div id="myDropdown" className={"dropdown-content " + (show? 'show' : '')}>
                            {props.player.name === playerState.playerName? <button className='button' onClick={surrender}>Сдаться</button>: ''}
                            {playerState.playerName === sessionState.currentPlayer && playerState.playerName !== props.player.name? <button className='button'>Заключить контракт</button>: '' }
                        </div>
                    </div>
                : props.player.name}
            
        </div>

        <div className='playerCard__balance'>
            {props.player.status !== StatusPlayer.Lost? props.player.balance + 'K': <img className='lost' src={require('../../assets/death.png')} alt='lost'/>}
        </div>
    </div>
}

export default PlayerCard;