import React, {FC, useEffect, useState, useRef} from 'react';
import { ICardInfoResponse, IPropsCardRectangular } from '../../interface';
import fieldState from '../../store/FieldState';
import { URL } from '../../const/url';
import './rectangularCard.scss';
import { observer } from 'mobx-react-lite';
import { colourStreet, colourBuyCard } from '../../const/clour';
import playerState from '../../store/PlayerState';
import CardInfo from './CardInfo';
import { TypeCard } from '../../enum';
import { getInfoCard } from '../../backend';
import sessionState from '../../store/SessionState';

const RectangularCard: FC<IPropsCardRectangular> = observer(({image, position, isRotate, isTop, id, isRight, isBottom, isLeft, type}) => {
    const state = fieldState.cardStates[id];
    const [info, setInfo] = useState(false);
    const [data, setData] = useState<null | ICardInfoResponse>(null);
    const ref = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        const handle = (e: any) => {
            if(!ref.current) return;
            if(!ref.current.contains(e.target)) {
                setInfo(false);
            }
        };

        document.addEventListener('click', handle);

        return () => {
            document.removeEventListener('click', handle)
        }
    }, [])

    async function click() {
        if(isCompany()) {
            setInfo(true);
            const response =  await getInfoCard(sessionState.sessionId, id);
            setData(response);
        }
    }

    function getClass() {
        if(isTop || isLeft) return 'rectangularCard__state_topAndLeft';
        else return 'rectangularCard__state_bottomAndRight'
    }

    function getClassStar() {
        if(isTop || isLeft) return 'star__topAndLeft';
        else return 'star__bottomAndRight'
    }

    function getColour(): string {
        if(state && state.ownerName) {
            const player = playerState.players.find(el => el.name === state.ownerName)
            if(player) {
                return colourBuyCard[player.colour]
            }
            return 'white'
        }
        return 'white'
    }

    function isCompany() {
        
        return type === TypeCard.Company
    }

    return (
    <div 
        ref={ref}
        className={isRotate? isTop? 'rectangularCard rectangularCard__rotate_top' : 'rectangularCard rectangularCard__rotate_bottom' : 'rectangularCard'} 
        style={{
            ...position, 
            backgroundImage: `url(${URL + image})`, 
            backgroundColor: state && state.ownerName? getColour(): 'white',
            zIndex: info? 10000: 100
        }}
        onClick={click}
    >
        {info? <CardInfo cardLevel={state.level} data={data} isBottom={isBottom} isLeft={isLeft} isTop={isTop} cardId={id} isRight={isRight}/>: ''}
        {state
            ? <div 
                className={'rectangularCard__state ' + getClass()}
                style={{
                    backgroundColor: colourStreet[state.collectionNumber - 1]
                }}
                >
                    {(state.ownerName? state.fine: state.price) + 'K'}
                </div>
            : ''}
        {state
            ? <div className={"star " + getClassStar()}>
                {state.level < 5?'★'.repeat(state.level): <span className='star__gold'>★</span>}
            </div>
            :''
        }
    </div>
    )
})

export default RectangularCard;