import { useRouter } from 'next/router';
import React, {FC, useState, useEffect, useRef} from 'react';
import { delSession, sendMoveTransition, sendSurrender } from '../../backend';
import { colorActivePlayer } from '../../const/clour';
import { StatusPlayer } from '../../enum';
import { IPlayer } from '../../interface';
import playerState from '../../store/PlayerState';
import sessionState from '../../store/SessionState';

interface IProps {
    player: IPlayer
    currentPlayer: string | null
}

const PlayerCard: FC<IProps> = (props: IProps) => {
    const isActive = props.currentPlayer === props.player.name;
    const colour = colorActivePlayer[props.player.colour];
    const [show, setShow] = useState(false)
    const ref = useRef<null | HTMLDivElement>(null);
    const router = useRouter()

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
    
    function exit() {
        router.push('/');
        delSession(sessionState.sessionId);
    }

    if(props.player.status === StatusPlayer.Won) {
        return <div className="won">
            <div className="won__text">
                Победитель этой игры
            </div>
            <div>
                <img src='/assets/biba.jpg' alt="" className="playerCard__img" style={{borderColor: colour[1]}}/>
            </div>
            <div>
                {props.player.name}
            </div>
            <button onClick={exit} className='exit'>
                Выход
                <img src="/assets/logout.png" alt="" style={{width:'30px', height:'30px', marginLeft: '10px'}}/>
            </button>
        </div>
    }

    return <div className={'playerCard ' + (props.player.status === StatusPlayer.Lost? 'playerCard__lost': '')} style={{background: isActive?`linear-gradient(70deg, ${colour[0]}, ${colour[1]})`: '#14181b', transform: isActive? 'scale(1.06)': ''}}>
        <div>
            <img src='/assets/pl.jpg' alt="" className="playerCard__img" style={{borderColor: colour[1]}}/>
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
            {props.player.status !== StatusPlayer.Lost? props.player.balance + 'K': <img className='lost' src={'/assets/death.png'} alt='lost'/>}
        </div>
    </div>
}

export default PlayerCard;