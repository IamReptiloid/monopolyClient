import React, {FC} from 'react';
import fieldState from '../../store/FieldState';
import { ICell } from '../../interface';
import SquareCard from './SquareCard';
import RectangularCard from './RectangularCard';
import './field.scss';
import { observer } from 'mobx-react-lite';
import RollDice from '../process/RollDice';
import playerState from '../../store/PlayerState';
import Token from '../player/Token';

const Field: FC = observer(() => {
    return <div className='field'>
        <RollDice/>
        {playerState.players.map(player => <Token key={player.id} player={player} coords={player.coords}/>)}
        <div className='field__container'>
            {fieldState.performance && fieldState.performance.border.map((card: ICell, i: number): React.ReactNode => { 
                const result =  i % 10 
                    ?<RectangularCard id={card.id} isTop={card.isTop} isRotate={card.isRotate} key={card.id} image={card.image} position={card.coords}/> 
                    :<SquareCard key={card.id} image={card.image} position={card.coords}/>
                return result;
            }) }
        </div>
    </div>
})

export default Field