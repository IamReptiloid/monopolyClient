import React, {FC} from 'react';
import { IPlayer } from '../../interface';
import './playerCard.scss';
const logo =  require("../../assets/pl.jpg")

interface IProps {
    player: IPlayer
}

const PlayerCard: FC<IProps> = (props: IProps) => {
    return <div className='playerCard'>
        <div>
            <img src={logo} alt="" className="playerCard__img" style={{borderColor: props.player.colour}}/>
        </div>
        <div className='playerCard__name'>
            {props.player.name}
        </div>
        <div className='playerCard__balance'>
            {props.player.balance}K
        </div>
    </div>
}

export default PlayerCard;