import React, {FC} from 'react';
import fieldState from '../store/FieldState';
import { ICell } from '../interface';
import SquareCard from './SquareCard';
import RectangularCard from './RectangularCard';
import '../style/field.scss';
import { observer } from 'mobx-react-lite';

const Field: FC = observer(() => {
    return <div className='field'>
        {fieldState.performance && fieldState.performance.border.map((card: ICell, i: number): React.ReactNode => { 
            const result =  i % 10 
                ?<RectangularCard transform={card.transform} key={card.id} image={card.image} position={card.coords}/> 
                :<SquareCard key={card.id} image={card.image} position={card.coords}/>
            return result;
        }) }
    </div>
})

export default Field