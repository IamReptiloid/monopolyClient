import React, {FC} from 'react';
import { JSDocNonNullableType } from 'typescript';
import { IPlayer } from '../../interface';
import playerState from '../../store/PlayerState';
import './chat.scss';

interface IProps {
    message: string,
    playerName: string | null
}

const Message: FC<IProps> = (props) => {
    let player: IPlayer | null = null
    if (props.playerName) {
        player = playerState.getPlayer(props.playerName) || null;
    }
    return <div className='message'>
        <span style={{color: player?.colour}}>{props.playerName? props.playerName:''}</span> <span>{props.message}</span>
    </div>
}

export default Message;