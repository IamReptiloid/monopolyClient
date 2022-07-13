import React, {FC} from 'react';
import { IPropsCardRectangular } from '../../interface';
import { URL } from '../../const/url';
import './rectangularCard.scss';

const RectangularCard: FC<IPropsCardRectangular> = ({image, position, isRotate, isTop}) => {
    // const transform = isRotate? isTop? 'translateY(-24%)' : '' : 'translateY(24)'
    return (
    <div 
        className={isRotate? isTop? 'rectangularCard rectangularCard__rotate_top' : 'rectangularCard rectangularCard__rotate_bottom' : 'rectangularCard'} 
        style={{...position}}
    >
        <img 
            className='rectangularCard__img' 
            src={URL + image} 
            alt="КАРТИНОЧКА" 
        />
    </div>)
}

export default RectangularCard;