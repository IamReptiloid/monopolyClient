import React, {FC} from 'react';
import { IPropsCard } from '../interface';
import '../style/squareCard.scss';

const SquareCard: FC<IPropsCard> = ({img, position}) => {
    return <div className='squareCard' style={position}>
        <img src={img} alt="КАРТИНОЧКА"/>
    </div>
}

export default SquareCard;