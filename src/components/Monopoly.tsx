import React, {FC, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Field } from '../model/Field';
import FieldComponent from './field/Field';
import PlayerCards from './player/PlayeCards';
import AddPlayer from './player/AddPlayer';
import sessionState from '../store/SessionState';
import playerState from '../store/PlayerState';
import { observer } from 'mobx-react-lite';
import { setInitState } from '../utils/initApplication';
import './monopoly.scss'

interface iParams {
    id: string
}

const Monopoly: FC = observer(() => {
	const params = useParams<iParams>();
    useEffect(() => {
        if(!sessionState.sessionId) {
    	    sessionState.setSessionId(params.id);
        }
		const field = new Field();
        setInitState(field, sessionState.sessionId);
    }, [])

    return <div className='monopoly'>
        {playerState.playerName? '': <AddPlayer/>}
        <PlayerCards/>
		<FieldComponent/>
    </div>
})

export default Monopoly