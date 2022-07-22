import React, {FC} from 'react';
import { URL } from '../../const/url';
import { IPropsCard } from '../../interface';
import './squareCard.scss';

const SquareCard: FC<IPropsCard> = ({image, position, id}) => {
    function getBorderRadius(): string {
        const sizes = ['4px', '4px','4px','4px'];
        sizes[(id - 1)/10] = '12px';
        return sizes.join(' ') 
    }
    return <div className='squareCard' style={{...position, borderRadius: getBorderRadius()}}>
        <img className='squareCard__img' src={URL + image} alt="КАРТИНОЧКА"/>
    </div>
}

export default SquareCard;