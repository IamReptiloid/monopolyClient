import React, {FC} from 'react';
import { IPropsCardRectangular } from '../interface';
import '../style/rectangularCard.scss';

const RectangularCard: FC<IPropsCardRectangular> = ({image, position, transform}) => {
    return <div className='rectangularCard' style={{...position, transform: transform}}>
        <img className='rectangularCard__img' src={'http://localhost:8090' + image} alt="КАРТИНОЧКА" />
    </div>
}

export default RectangularCard;