import React, {FC, useEffect, useState} from 'react';
import { Field } from '../model/Field';
import FieldComponent from './field/Field';
import PlayerCards from './player/PlayeCards';
import AddPlayer from './player/AddPlayer';
import sessionState from '../store/SessionState';
import playerState from '../store/PlayerState';
import { observer } from 'mobx-react-lite';
import { setInitState } from '../utils/initApplication';
import style from './Monopoly.module.scss';
import { getScale } from '../utils/getScale';
import Head from 'next/head';

interface iParams {
    id: string
}

const Monopoly: FC = observer(() => {
    const [size, setSize] = useState<number>(1)
    useEffect(() => {
        setSize(getScale())
        if(!sessionState.sessionId) {
    	    sessionState.setSessionId(window.location.pathname.slice(7));
        }
		const field = new Field();
        setInitState(field, sessionState.sessionId);
        playerState.playerName = localStorage.getItem(sessionState.sessionId);
        window.onresize = () => {
            setSize(getScale())
        }
    }, [])

    return <div className={style.monopoly} style={{transform: `scale(${size})`}}>
        <Head><title>Монополия</title></Head>
        {playerState.playerName || sessionState.isStart? '': <AddPlayer/>}
        <PlayerCards/>
		<FieldComponent/>
    </div>
})

export default Monopoly