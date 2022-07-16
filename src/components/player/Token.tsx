import { observer } from 'mobx-react-lite';
import React, {FC} from 'react';
import { IPlayer } from '../../interface';
import './token.scss'
interface IProps {
    player: IPlayer
    coords: [number, number]
}

const Token: FC<IProps> = observer((props: IProps) => {
    return <div 
        className='token' 
        style={{backgroundColor: props.player.colour, transform: `translate(${props.coords[0]}px, ${props.coords[1]}px)`, border: `1px solid ${props.player.colour}`}}
        >   
    </div>
}) 

export default Token;