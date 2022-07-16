import React, {FC} from 'react';
import { IPropsCardRectangular } from '../../interface';
import fieldState from '../../store/FieldState';
import { URL } from '../../const/url';
import './rectangularCard.scss';
import { observer } from 'mobx-react-lite';
import { colourStreet, colourBuyCard } from '../../const/clour';
import playerState from '../../store/PlayerState';

const RectangularCard: FC<IPropsCardRectangular> = observer(({image, position, isRotate, isTop, id, isRight, isBottom, isLeft}) => {
    const state = fieldState.cardStates[id];

    function getClass() {
        if(isTop || isLeft) return 'rectangularCard__state_topAndLeft';
        else return 'rectangularCard__state_bottomAndRight'
    }

    function getColour(): string {
        if(state && state.ownerName) {
            const player = playerState.players.find(el => el.name === state.ownerName)
            if(player) {
                return colourBuyCard[player.colour]
            }
            return 'none'
        }
        return 'none'
    }
    return (
    <div 
        className={isRotate? isTop? 'rectangularCard rectangularCard__rotate_top' : 'rectangularCard rectangularCard__rotate_bottom' : 'rectangularCard'} 
        style={{...position, backgroundImage: `url(${URL + image})`, backgroundColor: getColour()}}
    >
        {state
            ? <div 
                className={'rectangularCard__state ' + getClass()}
                style={{backgroundColor: colourStreet[state.collectionNumber - 1]}}
                >
                    {(state.ownerName? state.fine: state.price) + 'K'}
                </div>
            : ''}
    </div>
    )
})

export default RectangularCard;