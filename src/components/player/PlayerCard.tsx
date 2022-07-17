import React, {FC} from 'react';
import { colorActivePlayer } from '../../const/clour';
import { IPlayer } from '../../interface';
import sessionState from '../../store/SessionState';
import './playerCard.scss';
const logo =  require("../../assets/pl.jpg")

interface IProps {
    player: IPlayer
    currentPlayer: string
}

const PlayerCard: FC<IProps> = (props: IProps) => {
    const isActive = props.currentPlayer === props.player.name;
    const colour = colorActivePlayer[props.player.colour]
    return <div className='playerCard' style={{background: isActive?`linear-gradient(70deg, ${colour[0]}, ${colour[1]})`: '#14181b', transform: isActive? 'scale(1.06)': ''}}>
        <div>
            <img src={logo} alt="" className="playerCard__img" style={{borderColor: colour[1]}}/>
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