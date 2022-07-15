import React, {FC} from 'react';
import { ICard, IPropsCardRectangular } from '../../interface';
import fieldState from '../../store/FieldState';
import { URL } from '../../const/url';
import './rectangularCard.scss';
import { observer } from 'mobx-react-lite';
import { colourStreet } from '../../const/clour';

const RectangularCard: FC<IPropsCardRectangular> = observer(({image, position, isRotate, isTop, id, isRight, isBottom, isLeft}) => {
    const state = fieldState.cardStates.find(el => el.id === id);
    function getClass() {
        if(isTop || isLeft) return 'rectangularCard__state_topAndLeft';
        else return 'rectangularCard__state_bottomAndRight'
    }
    return (
    <div 
        className={isRotate? isTop? 'rectangularCard rectangularCard__rotate_top' : 'rectangularCard rectangularCard__rotate_bottom' : 'rectangularCard'} 
        style={{...position, backgroundImage: `url(${URL + image})`}}
    >
        {state
            ? <div 
                className={'rectangularCard__state ' + getClass()}
                style={{backgroundColor: colourStreet[state.collectionNumber - 1]}}
                >
                    {state.price + 'K'}
                </div>
            : ''}
    </div>
    )
})

export default RectangularCard;