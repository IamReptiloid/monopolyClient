import React, {FC, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Field } from '../model/Field';
import FieldComponent from './field/Field';
import PlayerCards from './player/PlayeCards';
import AddPlayer from './player/AddPlayer';
import RollDice from './process/RollDice';
import sessionState from '../store/SessionState';
import playerState from '../store/PlayerState';
import { observer } from 'mobx-react-lite';
import { setInitState } from '../utils/initApplication';
import './monopoly.scss'
import { getScale } from '../utils/getScale';

interface iParams {
    id: string
}

const Monopoly: FC = observer(() => {
	const params = useParams<iParams>();
    const [size, setSize] = useState<number>(1)
    useEffect(() => {
        if(!sessionState.sessionId) {
    	    sessionState.setSessionId(params.id);
        }
		const field = new Field();
        setInitState(field, sessionState.sessionId);
        // TODO
        // window.onresize = () => {
        //     setSize(getScale())
        // }
    }, [])

    return <div className='monopoly' style={{transform: `scale(${size})`}}>
        {playerState.playerName || sessionState.isStart? '': <AddPlayer/>}
        <PlayerCards/>
		<FieldComponent/>
    </div>
})

export default Monopoly