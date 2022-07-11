import React, {FC} from 'react';
import { IPlayer } from '../../interface';
import './playerCard.scss';

interface IProps {
    player: IPlayer
}

const PlayerCard: FC<IProps> = (props: IProps) => {
    return <div className='playerCard'>
        <div>
            {props.player.name}
        </div>
        <div>
            {props.player.balance}
        </div>
    </div>
}

export default PlayerCard;