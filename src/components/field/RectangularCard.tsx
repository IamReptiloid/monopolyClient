import React, {FC} from 'react';
import { IPropsCardRectangular } from '../../interface';
import { URL } from '../../const/url';
import './rectangularCard.scss';

const RectangularCard: FC<IPropsCardRectangular> = ({image, position, isRotate, isTop, id}) => {
    return (
    <div 
        className={isRotate? isTop? 'rectangularCard rectangularCard__rotate_top' : 'rectangularCard rectangularCard__rotate_bottom' : 'rectangularCard'} 
        style={{...position, backgroundImage: `url(${URL + image})`}}
    >

    </div>)
}

export default RectangularCard;