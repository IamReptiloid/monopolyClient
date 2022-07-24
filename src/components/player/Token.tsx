import { observer } from 'mobx-react-lite';
import React, {FC} from 'react';
import { StatusPlayer } from '../../enum';
import { IPlayer } from '../../interface';
import playerState from '../../store/PlayerState';
interface IProps {
    player: IPlayer
    coords: [number, number]
}

const Token: FC<IProps> = observer((props: IProps) => {
    if(playerState.getPlayer(props.player.name)?.status === StatusPlayer.Lost) {
        return <></>
    }
    
    return <div 
        className='token' 
        style={{backgroundColor: props.player.colour, transform: `translate(${props.coords[0]}px, ${props.coords[1]}px)`, border: `1px solid ${props.player.colour}`}}
        >   
    </div>
}) 

export default Token;