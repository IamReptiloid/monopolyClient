import React, {FC, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Field } from '../model/Field';
import FieldComponent from './Field';
import sessionState from '../store/SessionState';
import { setInitState } from '../utils/initApplication';

interface iParams {
    id: string
}

const Monopoly: FC = () => {
	const params = useParams<iParams>();
    useEffect(() => {
        if(!sessionState.sessionId) {
    	    sessionState.setSessionId(params.id);
        }
		const field = new Field();
        setInitState(field);
    }, [])

    return <div className='monopoly'>
		<FieldComponent/>
    </div>
}

export default Monopoly