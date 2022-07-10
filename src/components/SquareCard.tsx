import React, {FC} from 'react';
import { IPropsCard } from '../interface';
import '../style/squareCard.scss';

const SquareCard: FC<IPropsCard> = ({image, position}) => {
    return <div className='squareCard' style={position}>
        <img src={'http://localhost:8090' + image} alt="КАРТИНОЧКА"/>
    </div>
}

export default SquareCard;