import React, {FC} from 'react';
import { observer } from 'mobx-react-lite';
import playerState from '../../store/PlayerState';
import PlayerCard from './PlayerCard';
import sessionState from '../../store/SessionState';
import './playerCards.scss';

const PlayerCards: FC = observer(() => {
    return <div className='playerCards'>
        {playerState.players.map(player => {
            return <PlayerCard key={player.id} currentPlayer={sessionState.currentPlayer} player={player}/>
        })}
    </div>
})

export default PlayerCards;