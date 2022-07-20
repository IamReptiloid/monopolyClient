import React, {FC} from 'react';
import { URL } from '../../const/url';
import { IPropsCard } from '../../interface';
import './squareCard.scss';

const SquareCard: FC<IPropsCard> = ({image, position}) => {
    return <div className='squareCard' style={position}>
        <img className='squareCard__img' src={URL + image} alt="КАРТИНОЧКА"/>
    </div>
}

export default SquareCard;