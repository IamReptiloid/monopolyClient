import React, {FC} from 'react';
import { IPropsCardRectangular } from '../interface';
import '../style/rectangularCard.scss';

const RectangularCard: FC<IPropsCardRectangular> = ({img, position, transform}) => {
    return <div className='rectangularCard' style={{...position, transform: transform}}>
        <img src={img} alt="КАРТИНОЧКА" />
    </div>
}

export default RectangularCard;